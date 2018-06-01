import {parseJSON} from './parseJson'

const URL_BASE = `https://api.nal.usda.gov`
const DOMAIN = `ndb/search`

const composeQueryParams = queryParams => {
  return Object.keys(queryParams).reduce((prev, next, i) => {
    const query = `${next}=${queryParams[next]}`
    return i ? `${prev}&${query}` : `${prev}${query}`
  }, `?`)
}

const composeUrl = (urlBase, domain, params) => {
  const urlDomain = domain ? `${urlBase}/${domain}` : urlBase
  const queryParams = params ? composeQueryParams(params) : ``

  return `${urlDomain}/${queryParams}`
}

export const normalizeFoods = errorValue => res => {
  const parsedResponse = parseJSON(() => {
    return errorValue
  })(res)

  return parsedResponse.errors || !parsedResponse.list ? errorValue : parsedResponse.list.item
}

export const createSearchRequest = term => ({
  url: composeUrl(URL_BASE, DOMAIN, {
    qs: `Standard Reference`,
    sort: `n`,
    max: `25`,
    offset: `0`,
    api_key: `DEMO_KEY`,
    format: `json`,
    q: term,
  }),
  category: `other`,
  method: `get`,
})
