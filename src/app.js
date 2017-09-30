import {div} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {
  const vtree$ = xs.of(
    div('waitForMe')
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
