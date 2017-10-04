import xs from 'xstream'
import { div, h2, input, p, button } from '@cycle/dom';

export const EventCreate = ({date, time}) => {
  return (
    div([
      h2('Event'),
      input(`.date`, {attrs: {type: 'date', name: 'event-date'}}),
      p(`Date selected: ${date}`),
      input(`.time`, {attrs: {type: 'time', name: 'event-time'}}),
      p(`Time selected: ${time}`),
      button('Create picorsito')
    ])
  )
}