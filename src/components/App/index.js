import xs from "xstream"
import isolate from '@cycle/isolate'
import {initReducer$, eventCreateLens, eventListLens} from "./model"
import view from "./view"
import EventCreate from "../EventCreate"
import EventList from '../EventList'

export function App(sources) {
  const eventCreate = isolate(EventCreate, {onion: eventCreateLens})(sources)
  const eventList = isolate(EventList, {onion: eventListLens})(sources)

  const request$ = xs.merge(eventCreate.HTTP)

  const reducer$ = xs.merge(initReducer$, eventCreate.onion, eventList.onion)

  const vtree$ = view(eventCreate.DOM, eventList.DOM)

  const sinks = {
    DOM: vtree$,
    onion: reducer$,
    HTTP: request$,
  }
  return sinks
}
