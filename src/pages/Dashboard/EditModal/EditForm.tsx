import React, { useContext } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Checkbox,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router-dom'

import { AuthContext } from '../../../context'
import ls from '../../../util/localstore'

import { Event } from '../'

interface Props {
  variantColor: string
  event: Event
}

interface LoginProps {
  email: string
  password: string
}

const EditForm = ({ variantColor, event }: Props) => {
  const authContext = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = ({ email, password }: LoginProps) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email,
        password
      }
    })
    .then(({ data, headers }) => {
      const user = JSON.stringify({
        'access-token': headers['access-token'],
        'client': headers['client'],
        'uid': data.data.uid
      })

      ls.set('user', user)
      authContext.login(user)
      history.push('/')
    })
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