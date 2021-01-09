import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Box,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'

import Alert from '../../components/Alert'

interface Event {
  id: string | number
  title: string
  location: string
}

const useEvents = () => {
  return useQuery('events', async () => {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3001/events',
      // headers: JSON.parse(localStorage.user)
    })
    return data
  })
}

const Dashboard = () => {
  const { data, error, isFetching } = useEvents()

  if (isFetching) return <Spinner />
  if (error) return <Alert />

  return (
    <SimpleGrid mb='2rem' columns={3} spacing={40}>
      {data.map((event: Event) => (
        <Box
          p='2rem'
          minW='sm'
          minH='sm'
          borderWidth='1px'
          key={event.id}
        >
          <Box fontWeight='bold'>{event.title}</Box>
          <Box>{event.location}</Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default Dashboard