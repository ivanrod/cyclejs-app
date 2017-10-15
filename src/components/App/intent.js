import xs from 'xstream'

export default (domSource, eventCreate) => {
  const createEvent$ = eventCreate.map(event => ({type: `CREATE_EVENT`, payload: event}))

  return xs.merge(createEvent$)
}
