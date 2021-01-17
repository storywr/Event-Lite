import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { 
  CalendarIcon,
  EmailIcon,
  HamburgerIcon,
  StarIcon
} from '@chakra-ui/icons'
import format from 'date-fns/format'
import { useHistory } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'
import { Event } from '../'

interface Props {
  event: Event
  handleDeleteClick: (event: Event) => void
  handleEditClick: (event: Event) => void
}

const EventCard = ({ event, handleEditClick, handleDeleteClick }: Props) => {
  const history = useHistory()
  const { user } = useAuth()

  const isCurrentUser = () => event.user.id == user?.id
  const hasImage = event && !!event['image_url']

  return (
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
      onClick={() => history.push(`/users/${event.user.id}/events/${event.id}`)}
    >
      <Flex h='40px' alignItems='flex-start' justifyContent='space-between'>
        <Flex
          textTransform='uppercase'
          fontSize='md'
          fontWeight='bold'
          maxW='80%'
          flexWrap='wrap'
        >
          {event.title}
        </Flex>
        {isCurrentUser() &&
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
        }
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
        <EmailIcon mr='0.5rem'/> {event.user.email}
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
      {hasImage &&
        <Image
          m='auto'
          minH='225px'
          maxH='225px'
          mt='1rem'
          src={event['image_url']}
        />
      }
      <Box mt='0.5rem'>
        <Heading as='h5' size='sm'>
          About
        </Heading>
        {event.description}
      </Box>
    </Box>
  )
}

export default EventCard