import React, { useState } from 'react'
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
  Spinner,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import format from 'date-fns/format'

import Alert from '../../components/Alert'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

export interface Event {
  id: string | number
  description: string
  title: string
  location: string
  start_datetime: string
}

const useEvents = () => {
  return useQuery('events', async () => {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3001/events',
      headers: JSON.parse(localStorage.user)
    })
    return data
  })
}

const Dashboard = () => {
  const [selectedEvent, setEvent] = useState<any>(null)
  const { data, error, isFetching } = useEvents()

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()

  const handleDeleteClick = (event: Event) => {
    setEvent(event)
    onDeleteOpen()
  }

  const handleEditClick = (event: Event) => {
    setEvent(event)
    onEditOpen()
  }

  if (isFetching) return <Spinner />
  if (error) return <Alert />

  return (
    <>
      <DeleteModal
        event={selectedEvent}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
      <EditModal
        event={selectedEvent}
        isOpen={isEditOpen}
        onClose={onEditClose}
      />
      <AddModal
        isOpen={isAddOpen}
        onClose={onAddClose}
      />
      <SimpleGrid mb='2rem' columns={3} spacing={35}>
        {data.map((event: Event) => (
          <Box
            boxShadow='md'
            rounded='lg'
            p='1rem'
            minW='md'
            minH='md'
            maxH='md'
            maxW='md'
            borderWidth='1px'
            overflow='scroll'
            key={event.id}
          >
            <Flex justifyContent='space-between'>
              <Flex
                textTransform='uppercase'
                fontSize='md'
                fontWeight='bold'
                maxW='80%'
                flexWrap='wrap'
              >
                {event.title}
              </Flex>
              <Menu>
                <MenuButton variant='ghost' as={Button}>
                  <HamburgerIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleEditClick(event)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDeleteClick(event)}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex fontWeight='semibold' mt='0.5rem' maxW='80%' flexWrap='wrap'>{event.location}</Flex>
            <Flex fontWeight='semibold' mt='0.5rem' maxW='80%' flexWrap='wrap'>
              {format(new Date(event['start_datetime']), 'M/d/yyyy, h:mm aa')}
            </Flex>
            <Box mt='1rem' maxW='80%' flexWrap='wrap'>
              {event.description}
            </Box>
          </Box>
        ))}
        <Button
          onClick={() => onAddOpen()}
          as={Button}
          p='2rem'
          minW='md'
          minH='md'
          borderWidth='1px'
        >
          <AddIcon m='auto'/>
        </Button>
      </SimpleGrid>
    </>
  )
}

export default Dashboard