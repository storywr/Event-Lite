import React, { useEffect, useState } from 'react'
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

import useDebouncedValue from '../../hooks/useDebouncedValue'
import useEvents from '../../hooks/useEvents'
import Alert from '../../components/Alert'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import EventCard from './EventCard'

export interface Event {
  id: string | number
  description: string
  title: string
  location: string
  start_datetime: string
  image_url: string
}

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [selectedEvent, setEvent] = useState<any>(null)
  const debouncedValue = useDebouncedValue(search, 500)
  const { data, error, isFetching, refetch } = useEvents(debouncedValue)

  useEffect(() => {
    refetch()
  }, [debouncedValue])

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