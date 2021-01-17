import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import Dashboard from '../Dashboard'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useUserEvents from '../../hooks/useUserEvents'

const UserEvents = () => {
  const { id }: any = useParams()
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebouncedValue(search, 500)
  const userEvents = useUserEvents({ userId: id, search: debouncedValue })

  useMemo(() => {
    userEvents.refetch()
  }, [debouncedValue, id])

  return (
    <Dashboard
      userEvents={userEvents}
      setSearch={setSearch}
      search={search}
      isUser
    />
  )
}

export default UserEvents