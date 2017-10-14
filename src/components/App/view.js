import xs from 'xstream'
import {div, h1, header, article} from '@cycle/dom'
import './styles.css'

export default (state$, eventCreateDOM) => {
  return xs.combine(state$, eventCreateDOM)
    .map(([{}, eventCreate]) =>
      div([
        header(`.header`,
          h1(`.title`, `waitForMe!`)
        ),
        article(`.creators`,
          [
            eventCreate,
          ]
        ),
      ])
    )
}
