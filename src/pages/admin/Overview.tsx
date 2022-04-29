import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { ScriptableContext } from 'chart.js'
import { Chart } from 'primereact/chart'
import React from 'react'
import { useFetch } from 'use-http'
import { AddFormButton } from '../../components/Buttons'
import { MatcherCard, SubmissionItem } from '../../components/Cards'


const demoSubmissions: Array<SubmissionProps> = [
    { name: 'Student 1', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-28T12:11:48Z', email: 'student1@uzh.ch' },
  { name: 'Student 2', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-29T12:11:48Z', email: 'student2@uzh.ch' },
  { name: 'Student 3', courseName: 'Software Engineering FS22', submissionTimestamp: '2022-04-29T12:11:48Z', email: 'student3@uzh.ch' }
]

export default function Overview() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])
  const { data: latestSubmissions } = useFetch<Array<SubmissionProps>>('/submissions/latest', [])
  const activeMatchers = matchers?.filter(matcher => matcher.active) || []

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading fontSize='xl'>Active Group Matchers</Heading>
        <HStack spacing={5}>
          {activeMatchers[0] && <MatcherCard matcher={activeMatchers[0]} colorIndex={2} />}
          {activeMatchers[1] && <MatcherCard matcher={activeMatchers[1]} colorIndex={1} />}
          <AddFormButton />
        </HStack>
        <Flex gap={20}>
          <Stack flexGrow={1} pr={10} spacing={5}>
            <Heading fontSize='xl'>Recent Submissions</Heading>
            {demoSubmissions.map((submission, index) =>
                <SubmissionItem key={index} submission={submission} />)}
          </Stack>
          <Stack w='md' spacing={6}>
            <Heading fontSize='xl'>Activity</Heading>
            <Chart type='line' data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{ data: [25, 29, 26, 15, 14, 11, 20],
                borderColor: (context: ScriptableContext<any>) => {
                  if (!context?.chart?.chartArea)
                    return;
                  const gradient = context.chart.ctx.createLinearGradient(0, context.chart.chartArea.bottom, 0, context.chart.chartArea.top)
                  gradient.addColorStop(0, '#344FDB')
                  gradient.addColorStop(0.6, '#CF6BFF')
                  gradient.addColorStop(1, '#CF6BFF')
                  return gradient
                },
                pointRadius: 0,
                fill: 'start',
                backgroundColor: 'rgba(177,255,140,0.1)',
                tension: .2 }]
            }} options={{
              aspectRatio: 1,
              scales: {
                x: {
                  ticks: { color: '#999999', font: { family: '"DM Sans", sans-serif', size: 10 } },
                  grid: { display: false } },
                y: {
                  min: 0, max: 50,
                  ticks: { color: '#999999', font: { family: '"DM Sans", sans-serif', size: 10 } },
                  grid: { color: '#ebedef', borderDash: [8,4] } }
              },
              plugins: {legend: { display: false } }
            }} />
          </Stack>
        </Flex>
      </Stack>
  )
}