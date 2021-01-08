import * as React from 'react'
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

const LoginForm = ({ variantColor }: any) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = ({ email, password }: any) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email,
        password
      }
    })
    .then(({ data, headers }) => {
      localStorage?.setItem('user',
        JSON.stringify({
          'access-token': headers['access-token'],
          'client': headers['client'],
          'uid': data.data.uid
      }))
    })
  }

  return (
    <Box my={8} textAlign='left'>
      <form>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input ref={register} name='email' type='email' placeholder='Enter your email' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input ref={register} name='password' type='password' placeholder='Enter your password' />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
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
        >
          Sign In
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm