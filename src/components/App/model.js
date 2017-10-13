import xs from 'xstream'

export default ({changeDate$, changeTime$}) => {
  const date$ = changeDate$
    .startWith(Date())
  const time$ = changeTime$
    .startWith(Date())

  return xs.combine(date$, time$)
    .map(([date, time]) => ({date, time}))
}
