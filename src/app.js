import {div} from '@cycle/dom'
import xs from 'xstream'
import {html} from 'snabbdom-jsx'

export function App (sources) {
  const vtree$ = xs.of(
    <div>
      <header>
        <h1>waitForMe</h1>
      </header>
      <article>
        <h2>Event</h2>
        <input type="date" name="event-date" />
        <input type="time" name="event-time" />
      </article>
    </div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
