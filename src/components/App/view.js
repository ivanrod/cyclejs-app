import xs from 'xstream'
import {div, h1, header, article} from '@cycle/dom'
import './styles.css'

export default (eventCreateDOM, eventListDOM) => {
  return xs.combine(eventCreateDOM, eventListDOM)
    .map(([eventCreate, eventList]) =>
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
      ])
    )
}
