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

import Alert from '../../components/Alert'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

export interface Event {
  id: string | number
  title: string
  location: string
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
            p='1rem'
            minW='sm'
            minH='sm'
            borderWidth='1px'
            key={event.id}
          >
            <Flex justifyContent='space-between' fontWeight='bold'>
              <Flex maxW='80%' flexWrap='wrap'>{event.title}</Flex>
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
            <Flex mt='0.5rem' maxW='80%' flexWrap='wrap'>{event.location}</Flex>
          </Box>
        ))}
        <Button
          onClick={() => onAddOpen()}
          as={Button}
          p='2rem'
          minW='sm'
          minH='sm'
          borderWidth='1px'
        >
          <AddIcon m='auto'/>
        </Button>
      </SimpleGrid>
    </>
  )
}

export default Dashboard