import React, { useMemo, useState } from 'react'
import Dashboard from '../Dashboard'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useUserEvents from '../../hooks/useUserEvents'
import { useParams } from 'react-router-dom'

const UserEvents = () => {
  const { id }: any = useParams()
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebouncedValue(search, 500)
  const { data, error, isFetching, refetch } = useUserEvents({ userId: id, search: debouncedValue })

  useMemo(() => {
    refetch()
  }, [debouncedValue])

  return (
    <Dashboard
      data={data}
      error={error}
      isFetching={isFetching}
      setSearch={setSearch}
      search={search}
    />
  )
}

export default UserEvents