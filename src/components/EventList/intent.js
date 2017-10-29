export default domSource => {
  return domSource.select(`.remove`).events(`click`)
}
