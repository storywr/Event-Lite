import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import LoginForm from './LoginForm'
import LoginHeader from './LoginHeader'
import ThemeSelector from '../../components/ThemeSelector'

const VARIANT_COLOR = 'teal'

const Authentication = () => (
  <Flex
    minHeight='100vh'
    width='full'
    align='center'
    justifyContent='center'
  >
    <Box
      borderWidth={1}
      px={4}
      width='full'
      maxWidth='500px'
      borderRadius={4}
      textAlign='center'
      boxShadow='lg'
    >
      <ThemeSelector />
      <Box p={4}>
        <LoginHeader variantColor={VARIANT_COLOR} />
        <LoginForm variantColor={VARIANT_COLOR} />
      </Box>
    </Box>
  </Flex>
)

export default Authentication