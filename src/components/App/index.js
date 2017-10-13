import xs from "xstream"
import intent from "./intent"
import model from "./model"
import view from "./view"
import {IsolatedEventCreate} from "../EventCreate"

export function App(sources) {
  const eventCreateProps$ = xs
    .periodic(100)
    .map(() => ({initialDate: Date(), initialTime: `00:00`}))

  const eventCreate = IsolatedEventCreate({
    DOM: sources.DOM,
    props$: eventCreateProps$,
  })

  const actions = intent(sources.DOM)

  const state$ = model(actions)

  const vtree$ = view(state$, eventCreate.DOM)

  const sinks = {
    DOM: vtree$,
  }
  return sinks
}
