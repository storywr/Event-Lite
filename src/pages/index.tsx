import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import Dashboard from './Dashboard'
import Navbar from '../components/Navbar'
import Event from '../pages/Event'
import ls from '../util/localstore'

const Home = () => {
  if (!ls.get('user')) {
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <Flex minH='100vh' flexDirection='column'>
      <Navbar />
      <Flex ml='3rem'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/events/:id' component={Event} />
        </Switch>
      </Flex>
    </Flex>
  )
}

export default Home
