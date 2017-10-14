import {div, ul, li} from "@cycle/dom"
import './styles.css'

export default ($state) => {
  return $state.map(() =>
    div(
      [
        ul(
          [
            li(`Event 1`),
            li(`Event 2`),
          ]
        ),
      ]
    )
  )
}
