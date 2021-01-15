import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Spinner,
  useDisclosure,
  InputRightElement
} from '@chakra-ui/react'
import { 
  AddIcon,
  CloseIcon,
  SearchIcon,
} from '@chakra-ui/icons'

import Alert from '../../components/Alert'
import EventCard from './EventCard'
import Modals from './Modals'

export interface Event {
  id: string | number
  description: string
  title: string
  location: string
  start_datetime: string
  image_url: string
  user: {
    email: string
    id: string | number
  }
}

const Dashboard = ({ data, error, isFetching, setSearch, search }: any) => {
  const [selectedEvent, setEvent] = useState<any>(null)

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose
  } = useDisclosure()

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
    <Box display='block'>
      <Modals
        event={selectedEvent}
        isOpen={{
          add: isAddOpen,
          edit: isEditOpen,
          delete: isDeleteOpen
        }}
        onClose={{
          add: onAddClose,
          edit: onEditClose,
          delete: onDeleteClose
        }}
      />
      <Box mb='2rem' w='500px'>
        <FormLabel><SearchIcon /> Search for Event</FormLabel>
        <InputGroup>
          <Input
            name='title'
            placeholder='Search'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search &&
            <InputRightElement>
              <IconButton
                variant='ghost'
                aria-label="Clear search"
                icon={<CloseIcon />}
                onClick={() => setSearch('')}
              />
            </InputRightElement>
          }
        </InputGroup>
      </Box>
      <SimpleGrid mb='3rem' columns={3} spacing={35}>
        {data.map((event: Event) => (
          <EventCard
            event={event}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        ))}
        <Button
          onClick={() => onAddOpen()}
          as={Button}
          p='2rem'
          minW='500px'
          minH='500px'
          borderWidth='1px'
        >
          <AddIcon m='auto'/>
        </Button>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard