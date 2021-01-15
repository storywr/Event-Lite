import React, { useMemo, useState } from 'react'
import Dashboard from '../Dashboard'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useEvents from '../../hooks/useEvents'

const AllEvents = () => {
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebouncedValue(search, 500)
  const { data, error, isFetching, refetch } = useEvents({ search: debouncedValue })

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

export default AllEvents