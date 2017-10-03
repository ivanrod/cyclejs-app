import xs from 'xstream'

export default ({changeDate$, changeTime$}) => {
  const date$ = changeDate$
  .startWith(new Date())
  const time$ = changeTime$
  .startWith(new Date())

  return xs.combine(date$, time$)
  .map(([date, time]) => ({date, time}))
}