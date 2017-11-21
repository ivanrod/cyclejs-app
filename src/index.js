import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import onionify from 'cycle-onionify'
import {App} from './components/App'

const main = App
const wrappedMain = onionify(main)

const drivers = {
  DOM: makeDOMDriver(`#app`),
}

export const init = run(wrappedMain, drivers)
