import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import onionify from 'cycle-onionify'
import {App} from './components/App'

const main = App
const wrappedMain = onionify(main)

const drivers = {
  DOM: makeDOMDriver(`#app`),
  HTTP: makeHTTPDriver(),
}

export const init = run(wrappedMain, drivers)
