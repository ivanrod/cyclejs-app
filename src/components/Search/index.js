import intent from './intent'
import model, {innerModel} from './model'
import view from './view'
import xs from 'xstream'
export default function Search(sources) {
  const state$ = sources.onion.state$

  const actions = intent(sources.DOM, sources.HTTP, state$)

  const reducer$ = model(actions.state)

  const combinedState$ = xs.combine(innerModel(actions.state), state$).map(([x, y]) => ({...x, ...y}))
// innerModel(actions.state).subscribe({next: x=>console.log(x)})
  const vdom$ = view(combinedState$)
  // const vdom$ = view(state$)

  const sinks = {
    DOM: vdom$,
    onion: reducer$,
    HTTP: actions.http,
  }

  return sinks
}
