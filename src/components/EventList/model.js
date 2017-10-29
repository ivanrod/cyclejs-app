import xs from "xstream"

export default function(action$, props$) {

  return props$.map(props => ({events: props})).startWith({events: []})
}
