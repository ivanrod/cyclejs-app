import {identity, empty} from "ramda"

export const parseJSON = (errorCb = empty, successCb = identity) => text => {
  try {
    return successCb(JSON.parse(text))
  } catch (e) {
    return errorCb(e)
  }
}
