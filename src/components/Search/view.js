import {div, input, p, ul, li} from "@cycle/dom"
import "./styles.css"

export default state$ => {
  return state$.map(({selectableFood, loading, error}) =>
    div(`.container`, [
      input(`.search__input`, {
        attrs: {
          type: `search`,
          name: `search-food`,
          placeholder: `Search food...`,
          list: `foods`,
        },
      }),
      ul(
        `.search__list`,
        loading ?
          [li(`.search__list--item`, p(error || `Loading...`))] :
          Object.keys(selectableFood).map(id =>
            li(
              `.search__list--item`,
              {attrs: {value: selectableFood[id].name}},
              p(selectableFood[id].name)
            )
          )
      ),
    ])
  )
}
