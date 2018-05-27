import xs from "xstream"
import debounce from "xstream/extra/debounce"
import {parseJSON} from "@utils/parseJson"

const normalizeFoods = errorAction => res => {
  const parsedResponse = parseJSON((err) => {
    console.error(err)
    return errorAction
  })(res)

  return parsedResponse.errors || !parsedResponse.list ? errorAction : parsedResponse.list.item
}

const createChangeValuesAction = domSource => nodeName => eventType =>
  domSource
    .select(`.${nodeName}`)
    .events(`change`)
    .map(ev => ({type: eventType, payload: ev.target.value}))

export default (domSource, HTTP) => {
  const fetchFood$ = HTTP.select(`other`)
    .flatten()
    .map(res => res.text)
    .map(normalizeFoods({type: `SET_SELECTABLE_FOOD`, payload: []}))
    .map(res => ({type: `SET_SELECTABLE_FOOD`, payload: res}))

  const sendTerm$ = domSource
    .select(`.search__input`)
    .events(`input`)
    .compose(debounce(500))
    .map(ev => ev.target.value)
    .map(term => ({
      url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${term}&qs=Standard Reference&sort=n&max=25&offset=0&api_key=DEMO_KEY`,
      category: `other`,
      method: `get`,
    }))

  return {
    state: xs.merge(fetchFood$, createChangeValuesAction(domSource)(`search-food`)(`SEARCH_FOOD`)),
    http: sendTerm$,
  }
}
