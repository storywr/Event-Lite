import React, { useEffect, useState } from 'react'

import Authentication from './Authentication'
import Dashboard from './Dashboard'

const Home = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage?.getItem('user')
    setUser(user)
  }, [])

  return (
    user ? <Dashboard /> : <Authentication />
  )
}

export default Home
