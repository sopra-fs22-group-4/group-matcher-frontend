import { EditIcon, Icon } from '@chakra-ui/icons'
import {
  Button, Center, Flex, Heading, HStack, IconButton, Spinner, Stack, Stat, StatGroup, StatLabel, StatNumber
} from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { HiCalendar, HiLightBulb, HiUser } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import StudentCreator from './StudentCreator'

const demoStudents = [{ email: 'email1@email.com', submissionTimestamp: '22.05.22' },{ email: 'email1@email.com', submissionTimestamp: '22.05.22' }]

export default function Matcher() {
  const { matcherId } = useParams()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [matcherId])

  if (!matcher?.id)
    return <Center h='100vh'><Spinner /></Center>

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading fontSize='3xl'>{matcher.courseName}</Heading>
        <StatGroup boxShadow='lg' p={5}>
          <Stat>
            <HStack>
              <Icon as={HiUser} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Total Students</StatLabel>
            </HStack>
            <StatNumber pl={6}>{matcher.students.length}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiLightBulb} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Total Questions</StatLabel>
            </HStack>
            <StatNumber pl={6}>{matcher.questions.length}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiCalendar} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Publish Date</StatLabel>
            </HStack>
            <StatNumber pl={6}>{parseISO(matcher.publishDate).toLocaleDateString()}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiCalendar} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Due Date</StatLabel>
            </HStack>
            <StatNumber pl={6}>{parseISO(matcher.dueDate).toLocaleDateString()}</StatNumber>
          </Stat>
          <Button colorScheme='green' borderColor='green.500' color='green.500' variant='outline' borderWidth={2}
                  boxShadow='lg' rounded='lg' leftIcon={<AiOutlineEdit />} p={6}>Edit</Button>
        </StatGroup>
        <Flex flexGrow={1} gap={20}>
          <Stack flexGrow={1}>
            <HStack justify='space-between'>
              <Heading fontSize='2xl' color='purple.400'>Matching Questions</Heading>
              <Button as={Link} to='questions/create' colorScheme='blue' variant='ghost' px={4} py={2} size='sm' fontWeight={400}
                      color='white' bg='green.500' _hover={{ bg: 'green.400' }} leftIcon={<AiOutlinePlus />}>New question</Button>
            </HStack>
            <DataTable value={matcher.questions} autoLayout stripedRows>
              <Column style={{ width: '2rem' }} field='ordinalNum' header='#' />
              <Column field='content' header='Question' />
              <Column header='Possible Answers' />
              <Column style={{ width: '2rem' }} body={(student) => <IconButton variant='ghost' aria-label='edit student' icon={<EditIcon />} />} />
            </DataTable>
          </Stack>
          <Stack>
            <StudentCreator />
            <DataTable value={demoStudents} stripedRows autoLayout>
              <Column field='email' header='Email' />
              <Column field='submissionTimestamp' header='Submission Date' />
              <Column style={{ width: '2rem' }} body={(student) => <IconButton variant='ghost' aria-label='edit student' icon={<EditIcon />} />} />
            </DataTable>
          </Stack>
        </Flex>
      </Stack>
  )
}