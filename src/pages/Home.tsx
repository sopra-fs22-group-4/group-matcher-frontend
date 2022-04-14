import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <Heading color='blue.500'>Group Matcher</Heading>
        <ButtonGroup colorScheme='blue'>
          <Button as={Link} to='register' variant='outline'>Register</Button>
          <Button as={Link} to='login'>Login</Button>
        </ButtonGroup>
      </VStack>
  )
}
