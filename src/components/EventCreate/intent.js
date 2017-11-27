import xs from "xstream"

const createChangeValuesAction = domSource => nodeName => eventType =>
  domSource
    .select(`.${nodeName}`)
    .events(`change`)
    .map(ev => ({type: eventType, payload: ev.target.value}))

export default (domSource, HTTP, state$) => {
  const addEvent$ = HTTP
    .select(`event`)
    .flatten()
    .map((res) => ({type: `ADD_EVENT`, payload: res.body}))

  const sendEvent$ = domSource
    .select(`.create`)
    .events(`click`)
    .map(() => state$)
    .map((state) => ({
      url: `/event`,
      category: `event`,
      method: `post`,
      send: state.currentEvent,
    }))

  return {
    state: xs.merge(
      addEvent$,
      createChangeValuesAction(domSource)(`name`)(`CHANGE_NAME`),
      createChangeValuesAction(domSource)(`date`)(`CHANGE_DATE`),
      createChangeValuesAction(domSource)(`time`)(`CHANGE_TIME`),
      createChangeValuesAction(domSource)(`location`)(`CHANGE_LOCATION`)
    ),
    http: sendEvent$,
  }
}
