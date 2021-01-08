import * as React from 'react'
import {
  Box,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign='right' py={4}>
      <IconButton 
        variant='ghost'
        aria-label=''
        size='lg'
        onClick={() => toggleColorMode()}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      />
    </Box>
  )
}

export default ThemeSelector