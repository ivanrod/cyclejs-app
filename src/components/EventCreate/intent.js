import xs from "xstream"

const createChangeValuesAction = domSource => nodeName => eventType =>
  domSource
    .select(`.${nodeName}`)
    .events(`change`)
    .map(ev => ({type: eventType, payload: ev.target.value}))

export default domSource => {
  const addEventAction$ = domSource
    .select(`.create`)
    .events(`click`)
    .map(() => ({type: `ADD_EVENT`}))

  return xs.merge(
    addEventAction$,
    createChangeValuesAction(domSource)(`name`)(`CHANGE_NAME`),
    createChangeValuesAction(domSource)(`date`)(`CHANGE_DATE`),
    createChangeValuesAction(domSource)(`time`)(`CHANGE_TIME`),
    createChangeValuesAction(domSource)(`location`)(`CHANGE_LOCATION`)
  )
}
