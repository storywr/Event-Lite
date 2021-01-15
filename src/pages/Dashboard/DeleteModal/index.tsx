import React, { useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
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
import api from '../../../util/api'
import { AuthContext } from '../../../context'

interface Props {
  event: Event
  isViewing?: boolean
  isOpen: boolean
  onClose: () => void
}

const DeleteModal = ({ isViewing, event, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient()
  const history = useHistory()
  const authContext = useContext(AuthContext)

  const mutation = useMutation(() => axios({
    method: 'DELETE',
    url: `${api}/users/${authContext.user.id}/events`,
    headers: JSON.parse(localStorage.user),
  }),
  { 
    onSettled: () => {
      queryClient.setQueryData('events', (oldEvents: any) => oldEvents.filter((oldEvent: Event) => oldEvent.id !== event.id))
      isViewing && history.push('/')
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