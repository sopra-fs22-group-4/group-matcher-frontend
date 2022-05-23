import { Icon } from '@chakra-ui/icons'
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Center,
  CircularProgress, CircularProgressLabel, Flex,
  Heading, HStack, Spinner, Stack, Tag, TagLabel, Text, useToast, Wrap
} from '@chakra-ui/react'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'
import { AiOutlineAudit, AiOutlineBank, AiOutlineExport, AiOutlineThunderbolt } from 'react-icons/ai'
import { BiGroup } from 'react-icons/bi'
import { BsCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { HiCalendar, HiChartSquareBar, HiQuestionMarkCircle, HiUser } from 'react-icons/hi'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useSubscription } from 'react-stomp-hooks'
import { useFetch } from 'use-http'
import { StatItem, StatusTag } from '../../components/Buttons'
import { AnswersBarChart } from '../../components/Charts'
import { NameField } from '../../forms/AuthFields'
import { CollaboratorsField, DateField } from '../../forms/MatcherFields'
import ModalForm from '../../forms/ModalForm'
import { ChoiceAnswersField, QuestionContentField, SelectionField } from '../../forms/QuestionFields'

export default function Matcher() {
  const { matcherId } = useParams()
  const { name } = useOutletContext<AdminProps>()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [])
  const [page, setPage] = useState({ first: 0 })
  const toast = useToast()
  const navigate = useNavigate()

  useSubscription(`/topic/matchers/${matcherId}`, (message) => {
    const notification: NotificationProps = JSON.parse(message.body)
    if (notification.creatorName !== name)
      toast({ title: notification.creatorName+notification.content, description: 'Refreshing page...',
        duration: 3000, onCloseComplete: () => navigate(0) })
  })

  if (!matcher?.questions)
    return <Center flexGrow={1}><Spinner /></Center>

  const perPage = matcher.status === 'Draft' ? 4 : 1

  return (
      <Stack flexGrow={1} spacing={8} p={10}>
        <HStack justify='space-between'>
          <HStack spacing={4}>
            <Heading fontSize='3xl'>{matcher.courseName}</Heading>
            <StatusTag status={matcher.status} />
          </HStack>
          {matcher.questions.length &&
            <Button as={Link} to={`/matchers/${matcherId}/quiz`} state={matcher} variant='outline' colorScheme='purple'
                    boxShadow='lg' rounded='lg' p={6} leftIcon={<Icon as={AiOutlineExport} boxSize='1.5rem' />}>
              View Matching Quiz
            </Button>}
        </HStack>
        <Wrap justify='space-between' boxShadow='lg' spacing={4} p={3}>
          {matcher.status === 'Draft' ?
              <>
                <StatItem label='Students' value={matcher.students.length} icon={HiUser} />
                <StatItem label='Questions' value={matcher.questions.length} icon={HiQuestionMarkCircle} />
                <StatItem label='Publish Date' value={format(matcher.publishDate, 'dd.MM.yyyy HH:mm')} icon={HiCalendar} />
                <StatItem label='Due Date' value={format(matcher.dueDate, 'dd.MM.yyyy HH:mm')} icon={HiCalendar} />
              </> :
              <>
                <HStack>
                  <StatItem label='Total Submitted' value={matcher.submittedCount} icon={HiChartSquareBar} />
                  <CircularProgress value={matcher.submittedCount} max={matcher.students.length} color='green.500'>
                    <CircularProgressLabel>
                      {Math.round(matcher.submittedCount/matcher.students.length * 100)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </HStack>
                <HStack>
                  <StatItem label='Missing Submissions' value={matcher.students.length-matcher.submittedCount} icon={HiChartSquareBar} />
                  <CircularProgress value={matcher.students.length-matcher.submittedCount} max={matcher.students.length} color='red.400'>
                    <CircularProgressLabel>
                      {Math.round((matcher.students.length-matcher.submittedCount)/matcher.students.length * 100)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </HStack>
                <StatItem label='Time Left' value={formatDistanceToNowStrict(matcher.dueDate, {unit: 'day'})} icon={HiCalendar} />
              </>
          }
          <ButtonGroup>
            <ModalForm fields={['courseName', 'university', 'publishDate', 'dueDate', 'collaborators']} name='Matcher'
                       currentValues={matcher} url={`/matchers/${matcherId}`} variant='edit' allowDelete>
                <Stack spacing={6}>
                  <NameField fieldName='courseName' icon={AiOutlineAudit}/>
                  <NameField fieldName='university' icon={AiOutlineBank}/>
                  <DateField prefix='publish' isDisabled={matcher.status !== 'Draft'} />
                  <DateField prefix='due' />
                  <Heading fontSize='xl'>Collaborators</Heading>
                  <CollaboratorsField />
                </Stack>
            </ModalForm>
            <Button as={Link} to='students' colorScheme='green' boxShadow='lg' rounded='lg' p={6} leftIcon={<BiGroup fontSize='1.5rem' />} >
              Manage Students
            </Button>
          </ButtonGroup>
        </Wrap>
        <Flex flexGrow={1} justify='space-evenly' gap={8}>
          <Stack spacing={4} flexGrow={1}>
            <HStack justify='space-between'>
              <Heading fontSize='2xl' color='purple.500'>Matching Questions</Heading>
              {matcher.status === 'Draft' &&
                <Button as={Link} to='questions/create' colorScheme='green' size='sm' leftIcon={<FaPlus />}>
                  New Question
                </Button>}
            </HStack>
            {!matcher.questions.length &&
              <Center p={6} border='2px dashed' borderColor='gray.300' color='gray.400'>
                No questions found.
              </Center>}
            <Stack flexGrow={1}>
              {matcher.questions.slice(page.first, page.first+perPage).map((question, index) =>
                  <Stack key={question.id}>
                    <HStack borderWidth={2} borderColor='purple.150' rounded='md' p={6} pl={0}>
                      <Center as={Heading} color='purple.300' px={8}>
                        {page.first+index+1}
                      </Center>
                      <Stack flexGrow={1}>
                        <Text fontWeight={600}>{question.content}</Text>
                        <HStack>
                          <Tag colorScheme='blue' textTransform='capitalize'>{question.questionCategory}</Tag>
                          <Tag colorScheme='gray' color='gray.500' textTransform='capitalize'>{question.questionType}</Tag>
                          {matcher.status === 'Draft' &&
                            <ModalForm fields={['answers']} currentValues={question} url={`/questions/${question.id}`}
                                       name='Answers' variant='link'>
                              <ChoiceAnswersField />
                            </ModalForm>}
                        </HStack>
                      </Stack>
                      {matcher.status === 'Draft' &&
                        <ModalForm currentValues={question} fields={['content', 'questionType', 'questionCategory']}
                                   url={`/questions/${question.id}`} name='Question' variant='icon' allowDelete>
                          <Stack spacing={6}>
                            <QuestionContentField />
                            <SelectionField name='questionType' />
                            <SelectionField name='questionCategory' />
                          </Stack>
                        </ModalForm>}
                    </HStack>
                    {matcher.status === 'Active' &&
                      <Box bg='purple.250' rounded='md' p={5} px='20%'>
                        <AnswersBarChart question={question} />
                      </Box>}
                  </Stack>)}
            </Stack>
            <Paginator first={page.first} rows={perPage} onPageChange={setPage} totalRecords={matcher.questions.length} />
          </Stack>
          <Stack spacing={8} w='30%'>
            <Heading fontSize='2xl' color='purple.500'>Matching Logic</Heading>
            <Accordion allowToggle defaultIndex={matcher.matchingStrategy === 'Most Similar' ? 0 : 1}>
              {['Most Similar', 'Balanced Skills'].map(strategy =>
                  <AccordionItem key={strategy} boxShadow='lg' borderWidth={1} rounded='xl' mb={3}>
                    <AccordionButton justifyContent='space-between' py={3} rounded='xl'>
                      <Heading color={matcher.matchingStrategy === strategy ? 'blue.500' : 'initial'} fontSize='xl'>
                        {strategy}
                      </Heading>
                      {matcher.matchingStrategy === strategy &&
                        <Tag color='blue.500' bg='none' size='sm' gap={2}>
                          <Icon as={BsCircleFill} boxSize={2} />
                          <TagLabel fontWeight={600} textTransform='uppercase'>Active</TagLabel>
                        </Tag>}
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text>
                        Some explanation what does this strategy mean and breakdown of question categories
                      </Text>
                      {matcher.matchingStrategy !== strategy &&
                        <ButtonGroup pt={4} justifyContent='end' w='full'>
                          <Button variant='outline' color='blue.500' boxShadow='lg' rounded='lg' p={3} leftIcon={<AiOutlineThunderbolt />}>
                            Activate Strategy
                          </Button>
                        </ButtonGroup>}
                    </AccordionPanel>
                  </AccordionItem>)}
            </Accordion>
          </Stack>
        </Flex>
      </Stack>
  )
}