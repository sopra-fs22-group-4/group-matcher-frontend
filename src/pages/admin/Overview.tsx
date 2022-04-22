import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { AddFormButton } from '../../components/Buttons'
import { MatcherCard, SubmissionItem } from '../../components/Cards'

export default function Overview() {
  const matchers = useFetch<Array<MatcherProps>>('/matchers', []).data
  const latestSubmissions = useFetch<Array<SubmissionProps>>('/submissions/latest', []).data
  const activeMatchers = matchers?.filter(matcher => matcher.active) || []

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading fontSize='xl'>Active Group Matchings</Heading>
        <HStack spacing={5}>
          {activeMatchers[0] && <MatcherCard matcher={activeMatchers[0]} colorIndex={2} />}
          {activeMatchers[1] && <MatcherCard matcher={activeMatchers[1]} colorIndex={1} />}
          <AddFormButton />
        </HStack>
        <Flex>
          <Stack flexGrow={1}>
            <Heading fontSize='xl'>Recent Submissions</Heading>
            {latestSubmissions?.map((submission, index) =>
                <SubmissionItem key={index} submission={submission} />)}
          </Stack>
          <Stack flexGrow={1}>
            <Heading fontSize='xl'>Activity</Heading>
          </Stack>
        </Flex>
      </Stack>
  )
}