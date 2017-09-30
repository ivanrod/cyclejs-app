import {div} from '@cycle/dom'
import xs from 'xstream'
import {html} from 'snabbdom-jsx';

export function App (sources) {
  const vtree$ = xs.of(
    <div>waitForMe</div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
