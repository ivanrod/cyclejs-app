import xs from 'xstream'
import {html} from 'snabbdom-jsx'

export const EventCreate = ({date, time}) => {
  return (
    <div>
        <h2>Event</h2>
        <input className="date" type="date" name="event-date" />
        <p>Date selected: {date}</p>
        <input className="time" type="time" name="event-time" />
        <p>Time selected: {time}</p>
        <button>Create</button>
    </div>
  )
}