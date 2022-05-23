import { Button, Center, Flex, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'
import { FcCalendar } from 'react-icons/fc'
import { MdAddCircleOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useFetch } from 'use-http'
import { MatcherCard } from '../../components/Buttons'
import { DailySubmissionsChart } from '../../components/Charts'

export default function Overview() {
  const { data: matchers } = useFetch<Array<MatcherProps>>('/matchers', [])
  const { data: notifications } = useFetch<Array<NotificationProps>>('/notifications/latest', [])
  const { data: submissions } = useFetch<Record<string, number>>('/submissions/daily', [])
  const [page, setPage] = useState({ first: 0, rows: 6 })

  if (!matchers || !notifications || !submissions)
    return <Center flexGrow={1}><Spinner /></Center>

  return (
      <Stack flexGrow={1} justify='space-between' spacing={6} px={10} py={6}>
        <Stack flexGrow={1} spacing={4}>
          <Heading fontSize='xl'>Your Active Matchers</Heading>
          <HStack spacing={5}>
            {matchers[0] && <MatcherCard matcher={matchers[0]} />}
            {matchers[1] && <MatcherCard matcher={matchers[1]} />}
            <Button variant='dashed' as={Link} to='matchers/create'>
              <MdAddCircleOutline fontSize='1.5rem' />
              Add Matcher
            </Button>
          </HStack>
        </Stack>
        <Flex justify='space-evenly'>
          <Stack justify='space-between' spacing={5}>
            <Heading fontSize='xl'>Recent Activity</Heading>
            <Stack p={0} minH='43vh' flexGrow={1}>
              {notifications.slice(page.first, page.first+page.rows).map(notification =>
                  <Stack key={notification.id} borderWidth={1} borderLeftWidth={4} boxShadow='lg' fontSize='sm'
                         spacing={0} p={2} transition='0.2s ease-in-out' _hover={{ bg: 'blue.50' }}>
                    <Text><b>{notification.creatorName}</b>{notification.content} in <b>{notification.courseName}</b></Text>
                    <HStack>
                      <FcCalendar />
                      <Text fontSize='xs'>{format(parseISO(notification.createdAt), 'dd.MM.yyyy \'at\' HH:mm')}</Text>
                    </HStack>
                  </Stack>)}
            </Stack>
            {!notifications.length && <Text color='gray.400' fontSize='sm'>No notifications found.</Text>}
            <Paginator first={page.first} rows={page.rows} onPageChange={setPage} totalRecords={notifications.length} />
          </Stack>
          <Stack minW='40%' spacing={4}>
            <Heading fontSize='xl'>Daily Submissions</Heading>
            <DailySubmissionsChart submissions={submissions} />
          </Stack>
        </Flex>
      </Stack>
  )
}