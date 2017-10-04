import { div, h1, header, article } from '@cycle/dom';
import {EventCreate}  from '../EventCreate'

export default state$ => {
  return state$.map(({date, time}) => 
    div([
      header(`.header`,
        h1(`.title`, 'waitForMe!')
      ),
      article(`.body`,
        EventCreate({date, time})
      )
    ])
  )
}