import { Heading, Stack, Wrap } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { MatcherCard } from '../../components/Buttons'

export default function Matchers() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])
  const colorSchemes = ['purple', 'blue', 'orange', 'green']

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading>All Matchers</Heading>
        <Wrap spacing={8}>
          {matchers?.map((matcher, index) =>
              <MatcherCard key={index} matcher={matcher} colorScheme={colorSchemes[index]} />)}
        </Wrap>
      </Stack>
  )
}