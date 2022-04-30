import { Center, Flex, Heading, HStack, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'
import { useFetch } from 'use-http'
import { AddMatcherButton } from '../../components/Buttons'
import { MatcherCard, SubmissionItem } from '../../components/Cards'
import { GradientLineChart } from '../../components/Charts'

const demoSubmissions: Array<SubmissionProps> = [
    { name: 'Student 1', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-28T12:11:48Z', email: 'student1@uzh.ch' },
  { name: 'Student 2', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-29T12:11:48Z', email: 'student2@uzh.ch' },
  { name: 'Student 3', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-29T12:11:48Z', email: 'student3@uzh.ch' }
]

export default function Overview() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])
  const { data: latestSubmissions } = useFetch<Array<SubmissionProps>>('/submissions/latest', [])

  if (!matchers || !latestSubmissions)
    return <Center h='100vh'><Spinner /></Center>

  return (
      <Stack flexGrow={1} justify='space-between' spacing={20} p={12}>
        <Stack spacing={4}>
          <Heading fontSize='xl'>Recent Matchers</Heading>
          <HStack spacing={5}>
            {matchers[0] && <MatcherCard matcher={matchers[0]} colorIndex={2} path='matchers/' />}
            {matchers[1] && <MatcherCard matcher={matchers[1]} colorIndex={1} path='matchers/' />}
            <AddMatcherButton />
          </HStack>
        </Stack>
        <Flex flexGrow={1} gap={20}>
          <Stack flexGrow={1} pr={10} spacing={5}>
            <Heading fontSize='xl'>Recent Submissions</Heading>
            {demoSubmissions.map((submission, index) => <SubmissionItem key={index} submission={submission} />)}
          </Stack>
          <Stack minW='40%' spacing={6}>
            <Heading fontSize='xl'>Activity</Heading>
            <GradientLineChart labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} data={[25, 29, 26, 15, 14, 11, 20]} />
          </Stack>
        </Flex>
      </Stack>
  )
}