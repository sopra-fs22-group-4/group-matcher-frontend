import { Center, Flex, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { AddMatcherButton } from '../../components/Buttons'
import { MatcherCard, SubmissionItem } from '../../components/Cards'
import { GradientLineChart } from '../../components/Charts'

export default function Overview() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])
  const { data: latestSubmissions } = useFetch<Array<SubmissionProps>>('/submissions/latest', [])

  if (!matchers || !latestSubmissions)
    return <Center flexGrow={1}><Spinner /></Center>

  return (
      <Stack flexGrow={1} justify='space-between' spacing={10} px={10} py={6}>
        <Stack spacing={4}>
          <Heading fontSize='xl'>Recent Matchers</Heading>
          <HStack spacing={5}>
            {matchers[0] && <MatcherCard matcher={matchers[0]} colorIndex={2} path='matchers/' />}
            {matchers[1] && <MatcherCard matcher={matchers[1]} colorIndex={1} path='matchers/' />}
            <AddMatcherButton />
          </HStack>
        </Stack>
        <Flex flexGrow={1} gap={12}>
          <Stack flexGrow={1} pr={10} spacing={5}>
            <Heading fontSize='xl'>Recent Submissions</Heading>
            {latestSubmissions.map((submission, index) => <SubmissionItem key={index} submission={submission} />)}
            {!latestSubmissions.length && <Text color='gray.400' fontSize='sm'>No submissions found.</Text>}
          </Stack>
          <Stack minW='40%' spacing={4}>
            <Heading fontSize='xl'>Activity</Heading>
            <GradientLineChart labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} data={[25, 29, 26, 15, 14, 11, 20]} />
          </Stack>
        </Flex>
      </Stack>
  )
}