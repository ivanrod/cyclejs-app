import isolate from '@cycle/isolate'
import intent from './intent'
import model from './model'
import view from './view'

export default function EventCreate(sources) {
  const state$ = sources.onion.state$

  const actions$ = intent(sources.DOM)

  const reducer$ = model(actions$)

  const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$,
    onion: reducer$,
  }

  return sinks
}

export function IsolatedEventCreate(sources) {
  return isolate(EventCreate)(sources)
}
