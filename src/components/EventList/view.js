import {div, ul, li, p} from "@cycle/dom"
import moment from "moment"
import "./styles.css"

export default $state => {
  return $state.map(({events}) =>
    div([
      ul(`.event-list`,
        events && [
          li(`.item .item__title`, [
            p(`.item__column`, `Name`),
            p(`.item__column`, `Date`),
            p(`.item__column`, `Time`),
            p(`.item__column`, `Location`),
            p(`.item__remove`, `Delete`),
          ]),
          ...Object.keys(events).map(event =>
            li(`.item .item__content`, [
              p(`.item__column`, event),
              p(`.item__column`, moment(events[event].date).format(`LL`)),
              p(`.item__column`, events[event].time),
              p(`.item__column`, events[event].location),
              p(`.item__remove`, `X`),
            ])
          ),
        ]
      ),
    ])
  )
}
