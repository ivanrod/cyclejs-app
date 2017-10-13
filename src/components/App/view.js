import xs from 'xstream'
import {div, h1, header, article} from '@cycle/dom'

export default (state$, eventCreateDOM) => {
  return xs.combine(state$, eventCreateDOM)
    .map(([{}, eventCreate]) =>
      div([
        header(`.header`,
          h1(`.title`, `waitForMe!`)
        ),
        article({
          style: {
            backgroundColor: `#58D3D8`,
            borderRadius: `10px`,
          },
        },
        [
          eventCreate,

        ]
        ),
      ])
    )
}
