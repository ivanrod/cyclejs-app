import moment from "moment"
import {div, h2, input, button, p, option, h} from "@cycle/dom"
import './styles.css'

export default state$ => {
  return state$.map(({currentEvent: {date, time, location}}) =>
    div(`.container`, [
      h2(`New Event`),
      input(`.name`, {attrs: {placeholder: `Event name...`}}),
      input(`.date`, {attrs: {type: `date`, name: `event-date`}}),
      p(`Date selected: ${moment(date).format(`LL`)}`),
      input(`.time`, {attrs: {type: `time`, name: `event-time`}}),
      p(`Time selected: ${time}`),
      input(`.location`, {
        attrs: {
          type: `search`,
          name: `event-location`,
          placeholder: `Search location...`,
          list: `locations`,
        },
      }),
      h(`datalist#locations`, [
        option({attrs: {value: `Madrid`}}),
        option({attrs: {value: `Lugo`}}),
      ]),
      p(`Location: ${location}`),
      button(`.create`, `Create`),
    ])
  )
}
