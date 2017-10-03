import {html} from 'snabbdom-jsx'
import {EventCreate}  from '../EventCreate'

export default state$ => {
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