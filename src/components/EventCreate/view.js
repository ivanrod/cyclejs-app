import {div, h2, input, button, p, option, h} from "@cycle/dom"
import './styles.css'

export default state$ => {
  return state$.map(({date, time, location}) =>
    div(`.container`, [
      h2(`New Event`),
      input(`.date`, {attrs: {type: `date`, name: `event-date`}}),
      p(`Date selected: ${date}`),
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
