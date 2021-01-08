import React, { useContext } from 'react'
import {
  Button,
  Flex,
  Heading
} from '@chakra-ui/react'

import ThemeSelector from '../../components/ThemeSelector'
import { AuthContext } from '../../context'

const Navbar = () => {
  const authContext = useContext(AuthContext)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      p='2rem'
    >
      <Flex align='center' mr={5} ml={2}>
        <Heading as='h1' size='lg'>
          Blue Sky eLearn
        </Heading>
      </Flex>

      <Flex mr='1rem' alignItems='center'>
        <ThemeSelector />
        <Button ml='1rem' variant='ghost' onClick={() => authContext.logout()}>Logout</Button> 
      </Flex>

    </Flex>
  )
}

export default Navbar
