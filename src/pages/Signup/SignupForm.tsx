import React, { useContext } from 'react'
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

import { AuthContext } from '../../context'
import ls from '../../util/localstore'

interface Props {
  variantColor: string
}

interface LoginProps {
  email: string
  password: string
}

const SignupForm = ({ variantColor }: Props) => {
  const authContext = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  if (authContext.user) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const onSubmit = ({ email, password }: LoginProps) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth',
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
        >
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default SignupForm