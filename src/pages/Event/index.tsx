import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useEvent from '../../hooks/useEvent'

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
  Spinner,
  useDisclosure
} from '@chakra-ui/react'
import { 
  ArrowBackIcon,
  CalendarIcon,
  EmailIcon,
  HamburgerIcon,
  StarIcon
} from '@chakra-ui/icons'
import format from 'date-fns/format'

import Modals from '../Dashboard/Modals'
import Alert from '../../components/Alert'

const Event = () => {
  const { id, userId }: any = useParams()
  const { data: event, error, isFetching } = useEvent(userId, id)
  const history = useHistory()

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

  if (isFetching) return <Spinner />
  if (error) return <Alert />

  return (
    <Box p='1rem' margin='auto'>
      <Modals
        event={event}
        isOpen={{
          edit: isEditOpen,
          delete: isDeleteOpen
        }}
        isViewing
        onClose={{
          edit: onEditClose,
          delete: onDeleteClose
        }}
      />
      <Flex justifyContent='flex-end'>
        <Button
          mb='0.5rem'
          onClick={() => history.push('/')}
          leftIcon={<ArrowBackIcon />}
          variant='ghost'
        >
          Return to Events
        </Button>
      </Flex>
      <Box
        p='25px'
        mb='5rem'
        maxW='600px'
        borderWidth='1px'
        boxShadow='md'
        rounded='lg'
      >
        <Flex justifyContent='space-between'>
          <Flex
            textTransform='uppercase'
            fontSize='md'
            fontWeight='bold'
            maxW='80%'
            flexWrap='wrap'
          >
            <Heading as='h4' size='md'>
              {event.title}
            </Heading>
          </Flex>
          {event.currentUserCanEdit &&
            <Menu>
              <MenuButton variant='ghost' as={Button}>
                <HamburgerIcon />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => onEditOpen()}>Edit</MenuItem>
                <MenuItem onClick={() => onDeleteOpen()}>Delete</MenuItem>
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
        {event['image_url'] && 
          <Image
            maxW='550px'
            mt='1rem'
            src={event['image_url']}
          />
        }
        <Box
          whiteSpace='pre-wrap'
          mt='1rem'
          flexWrap='wrap'
        >
          <Heading as='h4' size='md'>
            About
          </Heading>
          {event.description}
        </Box>
      </Box>
    </Box>
  )
}

export default Event
