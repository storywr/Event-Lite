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
import "react-datepicker/dist/react-datepicker.css"

import TimePickerWrapper from './TimePickerWrapper'

import DatePicker from "react-datepicker"

interface Props {
  onClose: () => {}
  variantColor: string
}

interface EventProps {
  title: string
  location: string
  description: string
}

const AddForm = ({ onClose, variantColor }: Props) => {
  const { register, handleSubmit } = useForm()
  const [datetime, setDatetime] = useState(new Date())
  const queryClient = useQueryClient()

  const mutation = useMutation(({ description, title, location }: EventProps) => axios({
    method: 'POST',
    url: 'http://localhost:3001/events',
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

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea size='md' ref={register} name='description' />
        </FormControl>

        <TimePickerWrapper mt={4}>
          <FormLabel>Date</FormLabel>
          <DatePicker
            selected={datetime}
            onChange={(date: any) => setDatetime(date)}
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
          Add Event
        </Button>
      </form>
    </Box>
  )
}

export default AddForm