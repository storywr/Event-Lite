import React, { useMemo, useState } from 'react'

import Dashboard from '../Dashboard'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useEvents from '../../hooks/useEvents'

const AllEvents = () => {
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebouncedValue(search, 500)
  const userEvents = useEvents({ search: debouncedValue })

  useMemo(() => {
    userEvents.refetch()
  }, [debouncedValue])

  return (
    <Dashboard
      userEvents={userEvents}
      setSearch={setSearch}
      search={search}
    />
  )
}

export default AllEvents