import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'

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
          <Flex justifyContent='space-between' fontWeight='bold'>
            <Flex maxW='80%' flexWrap='wrap'>{event.title}</Flex>
            <Menu>
              <MenuButton as={Button}>
                <HamburgerIcon />
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex mt='0.5rem' maxW='80%' flexWrap='wrap'>{event.location}</Flex>
        </Box>
      ))}
      <Menu onOpen={() => console.log('open')}>
        <MenuButton
          as={Button}
          p='2rem'
          minW='sm'
          minH='sm'
          borderWidth='1px'
        >
          <AddIcon m='auto'/>
        </MenuButton>
      </Menu>
    </SimpleGrid>
  )
}

export default Dashboard