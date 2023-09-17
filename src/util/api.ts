const url = (process.env.NODE_ENV === 'development') 
  ? 'http://localhost:3003'
  : 'https://bs-event-app-api.herokuapp.com'

export default url
