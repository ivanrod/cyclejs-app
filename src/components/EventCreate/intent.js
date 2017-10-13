import xs from "xstream"

const createChangeValuesAction = domSource => nodeName => eventType =>
  domSource
    .select(`.${nodeName}`)
    .events(`change`)
    .map(ev => ({type: eventType, payload: ev.target.value}))

export default domSource => {
  return xs.merge(
    createChangeValuesAction(domSource)(`date`)(`CHANGE_DATE`),
    createChangeValuesAction(domSource)(`time`)(`CHANGE_TIME`),
    createChangeValuesAction(domSource)(`location`)(`CHANGE_LOCATION`)
  )
}
