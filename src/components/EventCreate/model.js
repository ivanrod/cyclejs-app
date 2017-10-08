import xs from 'xstream'

export default ({changeDate$, changeTime$, changeLocation$}, props$) => {
  const initalDate$ = props$.map(props => props.initialDate || Date()).take(1);
  const date$ = xs.merge(changeDate$, initalDate$)

  const initialTime$ = props$.map(props => props.initialTime || '00:00').take(1)
  const time$ = xs.merge(changeTime$, initialTime$)

  const location$ = changeLocation$.startWith('Not defined')

  return xs.combine(date$, time$, location$)
  .map(([date, time, location]) => ({date, time, location}))
}
