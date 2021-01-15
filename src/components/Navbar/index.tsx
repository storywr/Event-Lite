import React, { useContext } from 'react'
import {
  Button,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import ThemeSelector from '../../components/ThemeSelector'
import { AuthContext } from '../../context'

const Navbar = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      px='2rem'
      py='2rem'
    >
      <Flex
        align='center'
        mr={5}
        ml={2}
        onClick={() => history.replace('/')}
        cursor='pointer'
      >
        <Heading as='h1' size='lg'>
          Blue Sky eLearn
        </Heading>
      </Flex>

      <Flex mr='1rem' alignItems='center'>
        <ThemeSelector />
        <Button
          ml='1rem'
          variant='ghost'
          onClick={() => history.replace(`/users/${authContext.user.id}`)}
        >
          My Events
        </Button> 
        <Button
          ml='1rem'
          variant='ghost'
          onClick={() => authContext.logout()}
        >
          Logout
        </Button> 
      </Flex>

    </Flex>
  )
}

export default Navbar
