import React from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router-dom'

import ls from '../../util/localstore'
import api from '../../util/api'
import useAuth from '../../hooks/useAuth'

interface Props {
  variantColor: string
}

interface LoginProps {
  email: string
  password: string
}

const SignupForm = ({ variantColor }: Props) => {
  const { user, login } = useAuth()
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  if (user) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const onSubmit = ({ email, password }: LoginProps) => {
    axios({
      method: 'POST',
      url: `${api}/auth`,
      data: {
        email,
        password
      }
    })
    .then(({ data, headers }) => {
      const user = JSON.stringify({
        'access-token': headers['access-token'],
        'client': headers['client'],
        'uid': data.data.uid,
        'id': data.data.id,
        'nickname': data.data.nickname
      })

      ls.set('user', user)
      login(user)
      history.push('/')
    })
  }

  return (
    <Box my={8} textAlign='left'>
      <form>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            ref={register}
            name='email'
            type='email'
            placeholder='Enter your email'
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            ref={register}
            name='password'
            type='password'
            placeholder='Enter your password'
          />
        </FormControl>

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme={variantColor}
          width='full'
          mt={4}
          type='submit'
        >
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default SignupForm