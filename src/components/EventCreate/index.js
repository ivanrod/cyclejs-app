import isolate from '@cycle/isolate'
import intent from './intent'
import model from './model'
import view from './view'

export default function EventCreate({DOM: domSource, props$}) {
  const actions$ = intent(domSource)

  const state$ = model(actions$, props$)

  const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$,
    create: domSource.select(`.create`).events(`click`).map(() => state$.take(1)).flatten(),
  }

  return sinks
}

export function IsolatedEventCreate(sources) {
  return isolate(EventCreate)(sources)
}
