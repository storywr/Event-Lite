import React from 'react'
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

import { Event } from '../'

interface Props {
  event: Event
  isOpen: any
  onClose: any
}

const DeleteModal = ({ event, isOpen, onClose }: Props) => (
  <Modal onClose={onClose} size='xl' isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Delete Event</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {event?.location}
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default DeleteModal