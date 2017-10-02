import {div} from '@cycle/dom'
import xs from 'xstream'
import {html} from 'snabbdom-jsx'

const EventCreate = ({date, time}) => {
  return (
    <div>
        <h2>Event</h2>
        <input id="date" type="date" name="event-date" />
        <p>Date selected: {date}</p>
        <input id="time" type="time" name="event-time" />
        <p>Time selected: {time}</p>
        <button>Create</button>
    </div>
  )
}
const getChangeValues = sources => nodeName => sources.DOM.select(`#${nodeName}`)
  .events('change')
  .map(ev => ev.target.value)

export function App (sources) {

  const date$ = getChangeValues(sources)('date')
  .startWith(new Date())
  const time$ = getChangeValues(sources)('time')
  .startWith(new Date())

  const state$ = xs.combine(date$, time$)
  .map(([date, time]) => ({date, time}))

  const vtree$ = state$.map(({date, time}) =>
    <div>
      <header>
        <h1>waitForMe</h1>
      </header>
      <article>
        <EventCreate date={date} time={time} />
      </article>
    </div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
