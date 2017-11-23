import {div, ul, li, p} from "@cycle/dom"
import {makeCollection} from 'cycle-onionify'

import "./styles.css"

import EventItem from "../EventItem"

export default makeCollection({
  item: EventItem,
  itemKey: state => state.name,
  itemScope: key => key,
  collectSinks: instances => ({
    DOM: instances
      .pickCombine(`DOM`)
      .map(vnodes =>
        div([
          ul(
            `.event-list`,
            vnodes && [
              li(`.item .item__title`, [
                p(`.item__column`, `Name`),
                p(`.item__column`, `Date`),
                p(`.item__column`, `Time`),
                p(`.item__column`, `Location`),
                p(`.item__remove`, `Delete`),
              ]),
              ...vnodes,
            ]
          ),
        ])
      ),
    onion: instances.pickMerge(`onion`),
  }),
})
