import xs from "xstream"

export default function(action$) {
  const actionReducer$ = action$
    .filter(a => a.type === `REMOVE_EVENT`)
    .map(action => state => void 0)

  return xs.merge(actionReducer$)
}
