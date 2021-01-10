import React, { useState } from 'react'
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
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import TimePickerWrapper from '../AddModal/TimePickerWrapper'
import { Event } from '../'

interface Props {
  event: Event
  onClose: () => {}
  variantColor: string
}

interface EventProps {
  description: string
  title: string
  location: string
}

const EditForm = ({ event, onClose, variantColor }: Props) => {
  const { register, handleSubmit } = useForm()
  const [datetime, setDatetime] = useState(event['start_datetime'])
  const queryClient = useQueryClient()

  const mutation = useMutation(({ description, title, location }: EventProps) => axios({
    method: 'PUT',
    url: `http://localhost:3001/events/${event.id}`,
    headers: JSON.parse(localStorage.user),
    data: { event: {
      description,
      title,
      location,
      start_datetime: datetime
    }}
  }),
  { 
    onSettled: () => {
      queryClient.refetchQueries('events')
    }
  })

  const onSubmit = ({ description, title, location }: EventProps) => {
    mutation.mutate({ description, title, location })
    onClose()
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

          <TimePickerWrapper w='325px' mt={4} mb='1rem'>
            <FormLabel>Date</FormLabel>
            <DateTimePicker
              color='primary'
              variant='static'
              label="DateTimePicker"
              inputVariant="outlined"
              value={datetime}
              onChange={(date: any) => setDatetime(date)}
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
    </MuiPickersUtilsProvider>
  )
}

export default EditForm