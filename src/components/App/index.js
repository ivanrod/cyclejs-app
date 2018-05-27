import xs from "xstream"
import isolate from '@cycle/isolate'
import {initReducer$, searchLens, listLens} from "./model"
import view from "./view"
import Search from "../Search"
import List from '../List'

export function App(sources) {
  const search = isolate(Search, {onion: searchLens})(sources)
  const list = isolate(List, {onion: listLens})(sources)

  const request$ = xs.merge(search.HTTP)

  const reducer$ = xs.merge(initReducer$, search.onion, list.onion).debug(x=>console.log(x))

  const vtree$ = view(search.DOM, list.DOM)

  const sinks = {
    DOM: vtree$,
    onion: reducer$,
    HTTP: request$,
  }
  return sinks
}
