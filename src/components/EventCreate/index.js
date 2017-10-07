import xs from 'xstream'
import { div, h2, input, p, button } from '@cycle/dom';
import intent from './intent'
import model from './model'
import view from './view'
// export const EventCreate = ({date, time}) => {
//   return (
//     div([
//       h2('Event'),
//       input(`.date`, {attrs: {type: 'date', name: 'event-date'}}),
//       p(`Date selected: ${date}`),
//       input(`.time`, {attrs: {type: 'time', name: 'event-time'}}),
//       p(`Time selected: ${time}`),
//       button('Create')
//     ])
//   )
// }

export default function EventCreate(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props$;

  const actions = intent(sources.DOM)
  
  const state$ = model(actions, props$)

  const vdom$ = state$
    .map(({date, time}) => 
      div([
        h2('Event'),
        input(`.date`, {attrs: {type: 'date', name: 'event-date'}}),
        p(`Date selected: ${date}`),
        input(`.time`, {attrs: {type: 'time', name: 'event-time'}}),
        p(`Time selected: ${time}`),
        button('Create')
      ])   
    )

  const sinks = {
    DOM: vdom$
  }
  
  return sinks;
}