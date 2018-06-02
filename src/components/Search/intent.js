import xs from "xstream"
import debounce from "xstream/extra/debounce"
import {normalizeFoods, createSearchRequest} from "@utils/requests"

const setSelectableFood = foods => ({type: `SET_SELECTABLE_FOOD`, payload: foods})
const setLoading = loading => ({type: `SET_LOADING`, payload: loading})
const setOpened = opened => ({type: `SET_OPENED`, payload: opened})
const generateRequestError = error => ({type: `REQUEST_ERROR`, payload: error})

export default (domSource, HTTP) => {
  const input$ = domSource
    .select(`.search__input`)
    .events(`input`)
    .map(ev => ev.target.value)

  const click$ = domSource.select(`document`).events(`click`)
    .map(ev => ev.target.className)
    .map(className => {
      const options = {
        [`search__input`]: setOpened(true),
        [`search__list--item`]: setOpened(true),
        [`search__list--text`]: setOpened(true),
        default: setOpened(false),
      }

      return options[className] || options.default
    })

  const filteredInput$ = input$
    .filter(text => !!text)

  const sendTerm$ = filteredInput$
    .compose(debounce(500))
    .map(createSearchRequest)

  const fetchFood$ = HTTP.select(`other`)
    .flatten()
    .map(res => res.text)
    .map(normalizeFoods([]))

  const filteredFetch$ = xs
    .combine(input$, fetchFood$)
    .map(([text, foods]) => {
      const selectableFoodAction = text ? setSelectableFood(foods) : setSelectableFood([])

      return xs.of(setLoading(false), selectableFoodAction)
    })
    .flatten()
    .replaceError(error => xs.of(setLoading(false), generateRequestError(error)))

  const action$ = xs.merge(
    filteredFetch$,
    filteredInput$.map(() => setLoading(true)),
    click$
  )
  // .debug(x => console.log('Action:', x))

  return {
    state: action$,
    http: sendTerm$,
  }
}
