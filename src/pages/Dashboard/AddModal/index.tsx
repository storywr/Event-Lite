import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import AddForm from './AddForm'

interface Props {
  isOpen: any
  onClose: any
}

const AddModal = ({ isOpen, onClose }: Props) => (
  <Modal onClose={onClose} size='xl' isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add Event</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <AddForm onClose={onClose} variantColor='teal' />
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default AddModal