import * as React from 'react'
import {
  Box,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

interface Props {
  variantColor: string
}

const SignupHeader = ({ variantColor }: Props) => (
  <Box textAlign='center'>
    <Heading>Sign Up For Account</Heading>
    <Text>
      Or <Link as={ReactRouterLink} to='/login' color={`${variantColor}.500`}>Login</Link>
    </Text>
  </Box>
)

export default SignupHeader