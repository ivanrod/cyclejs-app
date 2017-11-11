import xs from "xstream"

export default function(action$, props$) {
  const propsReducer$ = props$.map(props => state => ({...state, events: props}))
  const actionReducer$ = action$.map(action => state => state)

  return xs.merge(actionReducer$, propsReducer$)
    .fold((state, reducer) => reducer(state), {events: []})
}
