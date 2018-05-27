import xs from 'xstream'
import {div, h1, header, article} from '@cycle/dom'
import './styles.css'

export default (searchDOM, listDOM) => {
  return xs.combine(searchDOM, listDOM)
    .map(([search, list]) =>
      div([
        header(`.header`,
          h1(`.title`, `food search!`)
        ),
        article(`.creators`,
          [
            search,
          ]
        ),
        article(`.event-list`,
          [
            list,
          ]
        ),
      ])
    )
}
