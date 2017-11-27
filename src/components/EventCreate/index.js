import isolate from '@cycle/isolate'
import intent from './intent'
import model from './model'
import view from './view'

export default function EventCreate(sources) {
  const state$ = sources.onion.state$

  const actions = intent(sources.DOM, sources.HTTP, state$)

  const reducer$ = model(actions.state)

  const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$,
    onion: reducer$,
    HTTP: actions.http,
  }

  return sinks
}

export function IsolatedEventCreate(sources) {
  return isolate(EventCreate)(sources)
}
