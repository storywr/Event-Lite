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

const LoginHeader = ({ variantColor }: Props) => (
  <Box textAlign='center'>
    <Heading>Sign Into Your Account</Heading>
    <Text>
      Or <Link as={ReactRouterLink} to='/signup' color={`${variantColor}.500`}>Sign Up</Link>
    </Text>
  </Box>
)

export default LoginHeader