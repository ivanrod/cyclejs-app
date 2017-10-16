import xs from "xstream"

export default function(action$, props$) {

  return xs.merge(props$)
}
