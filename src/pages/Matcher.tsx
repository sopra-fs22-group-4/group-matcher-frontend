import { Button, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Matcher() {
  const { matcherId } = useParams()

  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <Heading color='blue.500'>Admin Page for Matcher ID {matcherId}</Heading>
        <Button as={Link} to='create-question' colorScheme='blue'>Create new question</Button>
      </VStack>
  )
}