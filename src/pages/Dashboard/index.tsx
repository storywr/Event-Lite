import React, { useContext } from 'react'

import { AuthContext } from '../../context'

const Dashboard = () => {
  const authContext = useContext(AuthContext)

  return (
    <button onClick={() => authContext.logout()}>test</button>
  )
}

export default Dashboard