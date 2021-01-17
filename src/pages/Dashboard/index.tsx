import React, { useState } from 'react'
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Spinner,
  Heading,
  useDisclosure,
  InputRightElement
} from '@chakra-ui/react'
import { 
  AddIcon,
  CloseIcon,
  EmailIcon,
  SearchIcon,
} from '@chakra-ui/icons'

import Alert from '../../components/Alert'
import EventCard from './EventCard'
import Modals from './Modals'
import useAuth from '../../hooks/useAuth'

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

type Search = string

interface Props {
  userEvents: any
  setSearch: (search: Search) => void
  search: Search
  userId?: string | number
}

const Dashboard = ({
  userEvents: { data, error, isFetching },
  setSearch,
  search,
  userId
}: Props) => {
  const [selectedEvent, setEvent] = useState<any>(null)
  const { user } = useAuth()

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

  const isCurrentUser = () => userId == user?.id
  const isHome = () => !userId
  const showButton = () => isCurrentUser() || isHome()

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
        {userId && data.length > 0 &&
          <Heading
            display='flex'
            alignItems='center'
            mb='1rem'
            as='h3'
            size='md'
          >
            <EmailIcon mr='0.5rem'/> {data[0].user.email}
          </Heading>
        }
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
        {showButton() &&
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
        }
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard