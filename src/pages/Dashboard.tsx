import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <Heading color='blue.500'>Personal Admin Dashboard</Heading>
        <Text>Shows all matchers of the logged in admin</Text>
        <Button as={Link} to='/create-matcher' colorScheme='blue'>Create new matcher</Button>
      </VStack>
  )
}