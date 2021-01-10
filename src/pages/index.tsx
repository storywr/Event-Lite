import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import Dashboard from './Dashboard'
import { AuthContext } from '../context'
import Navbar from '../components/Navbar'

const Home = () => {
  const authContext = useContext(AuthContext)

  if (!authContext.user) {
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <Flex minH='100vh' flexDirection='column'>
      <Switch>
        <>
          <Navbar />
          <Flex ml='3rem'>
            <Route exact path='/'>
              <Dashboard />
            </Route>
          </Flex>
        </>
      </Switch>
    </Flex>
  )
}

export default Home
