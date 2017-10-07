import xs from 'xstream'

export default ({changeDate$, changeTime$}, props$) => {
  const initalDate$ = props$.map(props => props.initialDate).take(1);
  const date$ = xs.merge(changeDate$, initalDate$)

  const initialTime$ = props$.map(props => props.initialTime).take(1)
  const time$ = xs.merge(changeTime$, initialTime$)

  return xs.combine(date$, time$)
  .map(([date, time]) => ({date, time}))
}