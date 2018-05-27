import {div, input, button, p, option, h} from "@cycle/dom"
import './styles.css'

export default (state$) => {
  return state$.map(({currentFood: {food}, selectableFood}) =>
    div(`.container`, [
      input(`.search__input`, {
        attrs: {
          type: `search`,
          name: `search-food`,
          placeholder: `Search food...`,
          list: `foods`,
        },
      }),
      h(`datalist#foods`, Object.keys(selectableFood).map(id => option({attrs: {value: selectableFood[id].name}}))),
      food && p(`.search__result`, `Food: ${food}`),
      button(`.search__button`, `Add food`),
    ])
  )
}
