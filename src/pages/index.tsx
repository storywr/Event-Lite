import React, { useContext } from 'react'

import Authentication from './Authentication'
import Dashboard from './Dashboard'
import { AuthContext } from '../context'

const Home = () => {
  const authContext = useContext(AuthContext)

  return (
    authContext?.user ? <Dashboard /> : <Authentication />
  )
}

export default Home
