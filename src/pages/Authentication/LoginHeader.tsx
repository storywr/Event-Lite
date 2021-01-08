import * as React from 'react'
import {
  Box,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react'

const LoginHeader = ({ variantColor }: any) => (
  <Box textAlign='center'>
    <Heading>Sign Into Your Account</Heading>
    <Text>
      Or <Link color={`${variantColor}.500`}>Sign Up</Link>
    </Text>
  </Box>
)

export default LoginHeader