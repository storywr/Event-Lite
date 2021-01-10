import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Box,
  Button,
  Flex,
  FormLabel,
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

import useDebouncedValue from '../../hooks/useDebouncedValue'
import Alert from '../../components/Alert'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import api from '../../util/api'

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

const useEvents = (search: string) => {
  return useQuery('events', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api}/events?search=${search}`,
      headers: JSON.parse(localStorage.user)
    })
    return data
  })
}

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [selectedEvent, setEvent] = useState<any>(null)
  const debouncedValue = useDebouncedValue(search, 500)
  const { data, error, isFetching, refetch } = useEvents(debouncedValue)

  useEffect(() => {
    refetch()
  }, [debouncedValue])

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
      <Box mb='2rem' w='480px'>
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
            boxShadow='md'
            rounded='lg'
            p='1rem'
            minW='480px'
            minH='480px'
            maxH='480px'
            maxW='480px'
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
              <CalendarIcon mr='0.5rem' />{format(new Date(event['start_datetime']), 'M/d/yyyy, h:mm aa')}
            </Flex>
            {event['image_url'] && <Image mt='1rem' src={event['image_url']} />}
            <StyledBox
              mt='1rem'
              flexWrap='wrap'
            >
              {event.description}
            </StyledBox>
          </Box>
        ))}
        <Button
          onClick={() => onAddOpen()}
          as={Button}
          p='2rem'
          minW='480px'
          minH='480px'
          borderWidth='1px'
        >
          <AddIcon m='auto'/>
        </Button>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard