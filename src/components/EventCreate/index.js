import xs from 'xstream'
import intent from './intent'
import model from './model'
import view from './view'

export default function EventCreate({DOM:domSource, props$}) {
  const actions = intent(domSource)
  
  const state$ = model(actions, props$)

  const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$
  }
  
  return sinks
}
