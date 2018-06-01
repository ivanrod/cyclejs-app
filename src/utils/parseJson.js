import {identity, empty} from "ramda"

/* eslint-disable fp/no-nil */

export const parseJSON = (errorCb = empty, successCb = identity) => text => {
  try {
    return successCb(JSON.parse(text))
  } catch (e) {
    return errorCb(e)
  }
}
