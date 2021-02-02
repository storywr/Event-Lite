import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

interface Props {
  description?: string
  title?: string
}

const StyledAlert = ({ description = 'Something went wrong.', title = 'The request failed.' }: Props) => (
  <Alert
    status="error"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    h='200px'
    w='600px'
    m='auto'
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      {title}
    </AlertTitle>
    <AlertDescription maxWidth="sm">
      {description}
    </AlertDescription>
  </Alert>
)

export default StyledAlert