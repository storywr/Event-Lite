import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import DateTimePicker from 'react-datetime-picker'
import { useQueryClient, useMutation } from 'react-query'

interface Props {
  onClose: () => {}
  variantColor: string
}

interface EventProps {
  title: string
  location: string
}

const AddForm = ({ onClose, variantColor }: Props) => {
  const { register, handleSubmit } = useForm()
  const [datetime, setDatetime] = useState(new Date())
  const queryClient = useQueryClient()

  const mutation = useMutation((newEvent: EventProps) => axios({
    method: 'POST',
    url: 'http://localhost:3001/events',
    headers: JSON.parse(localStorage.user),
    data: { event: {
      title: newEvent.title,
      location: newEvent.location,
      start_datetime: datetime
    }}
  }),
  { 
    onSettled: () => {
      queryClient.refetchQueries('events')
    }
  })

  const onSubmit = ({ title, location }: EventProps) => {
    mutation.mutate({ title, location })
    onClose()
  }

  return (
    <Box my={8} textAlign='left'>
      <form>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input ref={register} name='title' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Location</FormLabel>
          <Input ref={register} name='location' />
        </FormControl>

        <DateTimePicker
          onChange={setDatetime}
          value={datetime}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme={variantColor}
          width='full'
          mt={4}
        >
          Add Event
        </Button>
      </form>
    </Box>
  )
}

export default AddForm