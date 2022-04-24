import { Button, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'

export default function Matcher() {
  const { matcherId } = useParams()
  const matcher = useFetch<MatcherProps>('/matchers/'+matcherId, [matcherId]).data

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading fontSize='3xl'>{matcher?.courseName}</Heading>
        <Heading fontSize='3xl' color='purple.400'>Form</Heading>
        <Button as={Link} to='create-question' colorScheme='blue'>Create new question</Button>
      </Stack>
  )
}