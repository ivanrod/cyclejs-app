import xs from 'xstream'

export default domSource => {
  return domSource
    .select(`.item__remove`)
    .events(`click`)
    .map((ev) => ({type: `REMOVE_EVENT`, payload: ev}))
}
