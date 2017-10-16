import intent from "./intent"
import model from "./model"
import view from "./view"

export function EventList({DOM: domSource, props$}) {
  const actions = intent(domSource)

  const state$ = model(actions, props$)

  const vtree$ = view(state$)

  const sinks = {
    DOM: vtree$,
  }
  return sinks
}
