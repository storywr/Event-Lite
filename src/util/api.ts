const url = (process.env.NODE_ENV === 'development') 
  ? 'http://localhost:3001'
  : 'https://bs-event-app-api.herokuapp.com'

export default url
