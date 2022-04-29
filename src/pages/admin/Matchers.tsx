import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { MatcherCard } from '../../components/Cards'

export default function Matchers() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading>Active Group Matchers</Heading>
        <SimpleGrid columns={2}>
          {matchers?.filter(matcher => matcher.active).map((matcher, index) =>
              <MatcherCard key={index} matcher={matcher} colorIndex={index} />)}
        </SimpleGrid>
      </Stack>
  )
}