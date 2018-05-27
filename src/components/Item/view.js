import {li, p} from "@cycle/dom"
import moment from "moment"
import "./styles.css"

export default state$ => {
  return state$.map((event) =>
    li(`.item .item__content`, [
      p(`.item__column`, event.name),
      p(`.item__column`, moment(event.date).format(`LL`)),
      p(`.item__column`, event.time),
      p(`.item__column`, event.location),
      p(`.item__remove`, `✖`),
    ])
  )
}
