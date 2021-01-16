import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import Event from '../Event'
import ls from '../../util/localstore'
import UserEvents from '../UserEvents'
import AllEvents from '../AllEvents'

const Home = () => {
  if (!ls.get('user')) {
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <Flex minH='100vh' flexDirection='column'>
      <Navbar />
      <Flex ml='3rem'>
        <Switch>
          <Route exact path='/' component={AllEvents} />
          <Route exact path='/users/:id' component={UserEvents} />
          <Route path='/users/:userId/events/:id' component={Event} />
        </Switch>
      </Flex>
    </Flex>
  )
}

export default Home
