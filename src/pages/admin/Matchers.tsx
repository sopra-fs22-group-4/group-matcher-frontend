import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { MatcherCard } from '../../components/Cards'

export default function Matchers() {
  const matchers = useFetch<Array<MatcherProps>>('/matchers', []).data

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading>Active Group Matchings</Heading>
        <SimpleGrid columns={2}>
          {matchers?.filter(matcher => matcher.active).map((matcher, index) =>
              <MatcherCard key={index} matcher={matcher} colorIndex={index} />)}
        </SimpleGrid>
      </Stack>
  )
}