import xs from 'xstream'
import {div, h1, ul, li, header, article} from '@cycle/dom'
import './styles.css'

export default (state$, eventCreateDOM, eventListDOM) => {
  return xs.combine(state$, eventCreateDOM, eventListDOM)
    .map(([{events}, eventCreate, eventList]) =>
      div([
        header(`.header`,
          h1(`.title`, `waitForMe!`)
        ),
        article(`.creators`,
          [
            eventCreate,
          ]
        ),
        article(`.event-list`,
          [
            eventList,
          ]
        ),
        ul(events.map(event => (li(event.date))))
      ])
    )
}
