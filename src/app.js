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

const getChangeValues = domSource => nodeName => domSource.select(`#${nodeName}`)
  .events('change')
  .map(ev => ev.target.value)

const intent = (domSource) => {
  return {
    changeDate$: getChangeValues(domSource)('date'),
    changeTime$: getChangeValues(domSource)('time')
  }
}

const model = ({changeDate$, changeTime$}) => {
  const date$ = changeDate$
  .startWith(new Date())
  const time$ = changeTime$
  .startWith(new Date())

  return xs.combine(date$, time$)
  .map(([date, time]) => ({date, time}))
}

const view = state$ => {
  return state$.map(({date, time}) =>
    <div>
      <header>
        <h1>waitForMe</h1>
      </header>
      <article>
        <EventCreate date={date} time={time} />
      </article>
    </div>
  )
}

export function App (sources) {

  const actions = intent(sources.DOM)

  const state$ = model(actions)

  const vtree$ = view(state$)
  
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
