import React, { useEffect, useState } from 'react'
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages'
import { AuthContext } from "./context"

const App = () => {
  const [user, setUser] = useState<any>(null)

  const login = (currentUser: string) => {
    setUser(currentUser)
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    const user = localStorage?.getItem('user')
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
