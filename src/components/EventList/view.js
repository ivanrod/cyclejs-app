import {div, ul, li, p} from "@cycle/dom"
import './styles.css'

export default ($state) => {
  return $state.map(({events}) =>
    div(
      [
        ul(
          events && Object.keys(events).map(event => li(`.item`, [
            p(event),
            p(events[event].date),
            p(events[event].time),
            p(events[event].location),
            p(`.remove`, `X`),
          ]))
        ),
      ]
    )
  )
}
