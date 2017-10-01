import {div} from '@cycle/dom'
import xs from 'xstream'
import {html} from 'snabbdom-jsx'

export function App (sources) {
  const vtree$ = sources.DOM.select('input').events('change')
  .map(ev => {
    const { target: { value, id } } = ev;
    return {
      [id]: value
    }
  })
  .fold((acc, next) => {

    return {
      ...acc,
      ...next
    }
  }, false)
  .map(({ date, time }) =>
    <div>
      <header>
        <h1>waitForMe</h1>
      </header>
      <article>
        <h2>Event</h2>
        <input id="date" type="date" name="event-date" />
        <p>Date selected: {date}</p>
        <input id="time" type="time" name="event-time" />
        <p>Time selected: {time}</p>
        <button>Create</button>
      </article>
    </div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
