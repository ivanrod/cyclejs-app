const getChangeValues = domSource => nodeName => domSource.select(`.${nodeName}`)
  .events('change')
  .map(ev => ev.target.value)

export default (domSource) => {
  return {
    changeDate$: getChangeValues(domSource)('date'),
    changeTime$: getChangeValues(domSource)('time')
  }
}
