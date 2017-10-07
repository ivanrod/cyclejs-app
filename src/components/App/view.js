import xs from 'xstream'
import { div, h1, header, article } from '@cycle/dom';
import {EventCreate}  from '../EventCreate'

export default (state$, eventCreateDOM) => {
  return xs.combine(state$, eventCreateDOM)
    .map(([{date, time}, eventCreate]) => 
      div([
        header(`.header`,
          h1(`.title`, 'waitForMe!')
        ),
        article(`.body`,
          eventCreate
        )
      ])
  )
}