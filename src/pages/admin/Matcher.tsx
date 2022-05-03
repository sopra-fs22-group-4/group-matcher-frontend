import { EditIcon, Icon } from '@chakra-ui/icons'
import {
  Button, Center, Flex, Heading, HStack, IconButton, Spinner, Stack, Stat, StatGroup, StatLabel, StatNumber
} from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import { lowerCase } from 'lodash'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { AiOutlineEdit, AiOutlineExport, AiOutlinePlus } from 'react-icons/ai'
import { HiAdjustments, HiCalendar, HiPuzzle, HiQuestionMarkCircle, HiUser } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { AnswersList } from '../../components/Cards'
import StudentCreator from './StudentCreator'

export default function Matcher() {
  const [expandedRows, setExpandedRows] = useState<any[]>([])
  const { matcherId } = useParams()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [matcherId])

  if (!matcher?.id)
    return <Center flexGrow={1}><Spinner /></Center>

  return (
      <Stack flexGrow={1} spacing={8} p={10}>
        <HStack justify='space-between'>
          <Heading fontSize='3xl'>{matcher.courseName}</Heading>
          <Button as={Link} to={'/matchers/'+matcherId} colorScheme='purple' boxShadow='lg' rounded='lg' p={6}
                  leftIcon={<Icon as={AiOutlineExport} boxSize='1.5rem' />}>View Matching Quiz</Button>
        </HStack>
        <StatGroup boxShadow='lg' p={3}>
          <Stat w='fit-content'>
            <HStack>
              <Icon as={HiUser} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Students</StatLabel>
            </HStack>
            <StatNumber pl={6}>{matcher.students.length}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiQuestionMarkCircle} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Questions</StatLabel>
            </HStack>
            <StatNumber pl={6}>{matcher.questions.length}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiAdjustments} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Group Size</StatLabel>
            </HStack>
            <StatNumber pl={6}>{matcher.groupSize}</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiPuzzle} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Strategy</StatLabel>
            </HStack>
            <StatNumber textTransform='capitalize' fontSize='lg' pl={6} pt={2}>
              {lowerCase(matcher.matchingStrategy.replace('_', ' '))}
            </StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiCalendar} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Publish Date</StatLabel>
            </HStack>
            <StatNumber textTransform='capitalize' fontSize='lg' pl={6} pt={2}>
              {parseISO(matcher.publishDate).toLocaleDateString()}
            </StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiCalendar} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Due Date</StatLabel>
            </HStack>
            <StatNumber textTransform='capitalize' fontSize='lg' pl={6} pt={2}>
              {parseISO(matcher.dueDate).toLocaleDateString()}
            </StatNumber>
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
            <DataTable value={matcher.questions} autoLayout stripedRows expandedRows={expandedRows} emptyMessage='No questions found.'
                       onRowToggle={(event) => setExpandedRows(event.data)} rowExpansionTemplate={AnswersList}>
              <Column expander />
              <Column style={{ paddingInline: 0 }} field='ordinalNum' header='#' />
              <Column style={{ minWidth: '12rem' }} field='content' header='Question' />
              <Column style={{ textTransform: 'capitalize' }} field='questionType' header='Type'
                      body={(question) => lowerCase(question.questionType.replace('_', ' '))} />
              <Column style={{ paddingInline: 0 }} body={(question) => <IconButton variant='ghost' aria-label='edit student' icon={<EditIcon />} />} />
            </DataTable>
          </Stack>
          <Stack>
            <StudentCreator />
            <DataTable value={matcher.students} stripedRows autoLayout emptyMessage='No students found.'>
              <Column field='email' header='Email' />
              <Column field='submissionTimestamp' header='Submission Date' />
              <Column style={{ paddingInline: 0 }} body={(student) => <IconButton variant='ghost' aria-label='edit student' icon={<EditIcon />} />} />
            </DataTable>
          </Stack>
        </Flex>
      </Stack>
  )
}