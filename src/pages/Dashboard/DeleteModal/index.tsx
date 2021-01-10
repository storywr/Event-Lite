import React from 'react'
import axios from 'axios'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useQueryClient, useMutation } from 'react-query'

import { Event } from '../'

interface Props {
  event: Event
  isOpen: any
  onClose: any
}

const DeleteModal = ({ event, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(() => axios({
    method: 'DELETE',
    url: `https://bs-event-app-api.herokuapp.com/events/${event.id}`,
    headers: JSON.parse(localStorage.user),
  }),
  { 
    onSettled: () => {
      queryClient.refetchQueries('events')
    }
  })

  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete <b>"{event?.title}"?</b>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              mutation.mutate()
              onClose()
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal