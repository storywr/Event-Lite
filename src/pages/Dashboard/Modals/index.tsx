import React from 'react'

import AddModal from '../AddModal'
import DeleteModal from '../DeleteModal'
import EditModal from '../EditModal'
import { Event } from '../'

interface Props {
  event: Event
  isOpen: {
    add?: boolean
    delete: boolean
    edit: boolean
  }
  isViewing?: boolean
  onClose: {
    add?: () => void
    delete: () => void
    edit: () => void
  }
}

const Modals = ({ event, isOpen, isViewing, onClose }: Props) => (
  <>
    <DeleteModal
      event={event}
      isOpen={isOpen.delete}
      onClose={onClose.delete}
      isViewing={isViewing}
    />
    <EditModal
      event={event}
      isOpen={isOpen.edit}
      onClose={onClose.edit}
    />
    {isOpen.add && onClose.add &&
      <AddModal
        isOpen={isOpen.add}
        onClose={onClose.add}
      />
    }
  </>
)

export default Modals