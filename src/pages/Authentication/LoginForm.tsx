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

import { AuthContext } from '../../context'
import ls from '../../util/localstore'
import api from '../../util/api'

interface Props {
  variantColor: string
}

interface LoginProps {
  email: string
  password: string
}

const LoginForm = ({ variantColor }: Props) => {
  const authContext = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  if (authContext.user) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const onSubmit = ({ email, password }: LoginProps) => {
    axios({
      method: 'POST',
      url: `${api}/auth/sign_in`,
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

        <Stack
          isInline
          justifyContent='space-between'
          mt={4}
        >
          <Box>
            <Checkbox>Remember Me</Checkbox>
          </Box>
          <Box>
            <Link color={`${variantColor}.500`}>Forgot your password?</Link>
          </Box>
        </Stack>

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme={variantColor}
          width='full'
          mt={4}
          type='submit'
        >
          Sign In
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm