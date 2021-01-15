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

import TimePickerWrapper from './TimePickerWrapper'
import api from '../../../util/api'
import { AuthContext } from '../../../context'

interface Props {
  onClose: () => void
  variantColor: string
}

interface EventProps {
  title: string
  location: string
  description: string
  imageUrl: string
}

const AddForm = ({ onClose, variantColor }: Props) => {
  const { register, handleSubmit } = useForm()
  const [datetime, setDatetime] = useState<Date>(new Date())
  const queryClient = useQueryClient()
  const authContext = useContext(AuthContext)

  const mutation = useMutation(({ imageUrl, description, title, location }: EventProps) => axios({
    method: 'POST',
    url: `${api}/users/${authContext.user.id}/events`,
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
    onSettled: () => {
      queryClient.refetchQueries('events')
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

        <FormControl mt={4}>
          <FormLabel>Image Url</FormLabel>
          <Input ref={register} name='imageUrl' />
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
          Add Event
        </Button>
      </form>
    </Box>
  )
}

export default AddForm