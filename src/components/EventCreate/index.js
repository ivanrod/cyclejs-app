import xs from 'xstream'
import intent from './intent'
import model from './model'
import view from './view'

export default function EventCreate(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props$;

  const actions = intent(sources.DOM)
  
  const state$ = model(actions, props$)

  const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$
  }
  
  return sinks
}
