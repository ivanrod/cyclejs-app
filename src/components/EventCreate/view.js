import xs from "xstream"
import { div, h2, input, button, p } from "@cycle/dom"
import { EventCreate } from "../EventCreate"

export default state$ => {
  return state$.map(({ date, time }) =>
    div([
      h2("Event"),
      input(`.date`, { attrs: { type: "date", name: "event-date" } }),
      p(`Date selected: ${date}`),
      input(`.time`, { attrs: { type: "time", name: "event-time" } }),
      p(`Time selected: ${time}`),
      button("Create")
    ])
  )
}
