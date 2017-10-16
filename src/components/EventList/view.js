import {div, ul, li} from "@cycle/dom"
import './styles.css'

export default ($state) => {
  return $state.map(({events}) =>
    div(
      [
        ul(
          events && events.map(event => li(event.date))
        ),
      ]
    )
  )
}
