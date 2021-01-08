import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Dashboard from './Dashboard'
import { AuthContext } from '../context'

const Home = () => {
  const authContext = useContext(AuthContext)

  if (!authContext.user) {
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard />
      </Route>
    </Switch>
  )
}

export default Home
