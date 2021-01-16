import React, { useContext, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"

import { Event } from '../'
import TimePickerWrapper from '../AddModal/TimePickerWrapper'
import api from '../../../util/api'
import { AuthContext } from '../../../context'

interface Props {
  event: Event
  onClose: () => void
  variantColor: string
}

interface EventProps {
  description: string
  title: string
  location: string
  imageUrl: string
}

const EditForm = ({ event, onClose, variantColor }: Props) => {
  const { register, handleSubmit } = useForm()
  const [datetime, setDatetime] = useState<Date>(new Date(event['start_datetime']))
  const queryClient = useQueryClient()
  const authContext = useContext(AuthContext)

  const mutation = useMutation(({ imageUrl, description, title, location }: EventProps) => axios({
    method: 'PUT',
    url: `${api}/users/${authContext.user.id}/events/${event.id}`,
    headers: JSON.parse(localStorage.user),
    data: { event: {
      description,
      title,
      location,
      start_datetime: datetime,
      image_url: imageUrl
    }}
  }),
  { 
    onSuccess: ({ data }: any) => {
      // queryClient.setQueryData('events', (oldEvents: any) => oldEvents.map((oldEvent: Event) => oldEvent.id === data.id ? data : oldEvent))
      // TODO: Sorting is currently done on the backend so the above update following mutation needs work
      queryClient.refetchQueries('events')
      queryClient.setQueryData('event', data)
    }
  })

  const onSubmit = ({ imageUrl, description, title, location }: EventProps) => {
    mutation.mutate({ imageUrl, description, title, location })
    onClose()
  }

  return (
    <Box my={8} textAlign='left'>
      <form>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input ref={register} name='title' defaultValue={event.title} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Location</FormLabel>
          <Input ref={register} name='location' defaultValue={event.location} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea minH='200px' size='md' ref={register} name='description' defaultValue={event.description} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Image Url</FormLabel>
          <Input ref={register} name='imageUrl' defaultValue={event['image_url']} />
        </FormControl>

        <TimePickerWrapper mt={4}>
          <FormLabel>Date</FormLabel>
          <DatePicker
            selected={datetime}
            onChange={(date: Date) => setDatetime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
        </TimePickerWrapper>

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme={variantColor}
          width='full'
          mt={4}
        >
          Update Event
        </Button>
      </form>
    </Box>
  )
}

export default EditForm