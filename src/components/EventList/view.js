import {div, ul, li, p} from "@cycle/dom"
import './styles.css'

export default ($state) => {
  return $state.map(({events}) =>
    div(
      [
        ul(
          events && events.map(event => li(`.item`, [
            p(event.name),
            p(event.date),
            p(event.time),
            p(event.location),
            p(`.remove`, `X`),
          ]))
        ),
      ]
    )
  )
}
