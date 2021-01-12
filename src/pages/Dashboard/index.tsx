import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Spinner,
  useDisclosure,
  InputRightElement
} from '@chakra-ui/react'
import { 
  AddIcon,
  CalendarIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
  StarIcon
} from '@chakra-ui/icons'
import format from 'date-fns/format'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import useDebouncedValue from '../../hooks/useDebouncedValue'
import useEvents from '../../hooks/useEvents'
import Alert from '../../components/Alert'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

const StyledBox = styled(Box)`
  white-space: pre-wrap;
`

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
  const history = useHistory()

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
          <Box
            _hover={{
              boxShadow: '0 8px 12px -1px rgba(0, 0, 0, 0.2), 0 4px 8px -1px rgba(0, 0, 0, 0.12)',
            }}
            cursor='pointer'
            boxShadow='md'
            rounded='lg'
            p='1rem'
            minW='500px'
            minH='500px'
            maxH='500px'
            maxW='500px'
            borderWidth='1px'
            overflowY='hidden'
            key={event.id}
            onClick={() => history.push(`/events/${event.id}`)}
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
                <MenuButton
                  onClick={e => e.stopPropagation()}
                  variant='ghost'
                  as={Button}
                >
                  <HamburgerIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={e => {
                      e.stopPropagation()
                      handleEditClick(event)}
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteClick(event)}
                    }
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex
              alignItems='center'
              fontWeight='semibold'
              mt='0.5rem'
              maxW='80%'
              flexWrap='wrap'
            >
              <StarIcon mr='0.5rem'/> {event.location}
            </Flex>
            <Flex
              alignItems='center'
              fontWeight='semibold'
              mt='0.5rem'
              maxW='80%' 
              flexWrap='wrap'
            >
              <CalendarIcon mr='0.5rem' />
              {format(new Date(event['start_datetime']), 'M/d/yyyy, h:mm aa')}
            </Flex>
            {event['image_url'] &&
              <Image mt='1rem' src={event['image_url']}
            />}
            <StyledBox
              mt='1rem'
              flexWrap='wrap'
            >
              <Heading as='h5' size='sm'>
                About
              </Heading>
              {event.description}
            </StyledBox>
          </Box>
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