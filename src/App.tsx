import React, { useEffect, useState } from 'react'
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages'
import { AuthContext } from './context'
import ls from './util/localstore'

const App = () => {
  const [user, setUser] = useState<string | null>(null)

  const login = (currentUser: string) => {
    setUser(currentUser)
  }

  const logout = () => {
    setUser(null)
    ls.remove('user')
  }

  useEffect(() => {
    const user = ls.get('user')
    setUser(user)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Router>
          <Switch>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </ChakraProvider>
  )
}

export default hot(App)
