import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <Heading>Group Matcher</Heading>
        <ButtonGroup>
          <Button as={Link} to='login' variant='outline'>Login</Button>
          <Button as={Link} to='register'>Register</Button>
        </ButtonGroup>
      </VStack>
  )
}
