import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './components/App'

const main = App

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
