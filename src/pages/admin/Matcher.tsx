import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, Center, Flex, Heading, HStack, Select, Spinner, Stack, Table, Tag, TagLabel, Tbody, Td, Text, Th,
  Thead, Tr, useToast, Wrap
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { AiOutlineAudit, AiOutlineBank, AiOutlineExport, AiOutlineSetting } from 'react-icons/ai'
import { BiGroup } from 'react-icons/bi'
import { BsCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { HiAdjustments, HiCalendar, HiPuzzle, HiQuestionMarkCircle, HiUser } from 'react-icons/hi'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useSubscription } from 'react-stomp-hooks'
import { useFetch } from 'use-http'
import { StatIcon, StatItem } from '../../components/Buttons'
import { NameField } from '../../forms/AuthFields'
import { CollaboratorsField, DateField } from '../../forms/MatcherFields'
import ModalForm from '../../forms/ModalForm'
import { ChoiceAnswersField, QuestionContentField, SelectionField } from '../../forms/QuestionFields'

const colorSchemes: Record<string, string> = { 'Draft': 'gray', 'Active': 'green', 'Completed': 'purple' }

export default function Matcher() {
  const { matcherId } = useParams()
  const { name } = useOutletContext<AdminProps>()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [])
  const toast = useToast()

  useSubscription(`/topic/matchers/${matcherId}`, (message) => {
    const notification: NotificationProps = JSON.parse(message.body)
    if (notification.creatorName !== name)
      toast({ title: notification.creatorName+notification.content,
        description: 'Refresh the page to see changes', status: 'info' })
  })

  if (!matcher?.questions)
    return <Center flexGrow={1}><Spinner /></Center>

  return (
      <Stack flexGrow={1} spacing={8} p={10}>
        <HStack justify='space-between'>
          <HStack spacing={4}>
            <Heading fontSize='3xl'>{matcher.courseName}</Heading>
            <Tag color={`${colorSchemes[matcher.status]}.400`} bg='none' size='sm' gap={2}>
              <Icon as={BsCircleFill} boxSize={2} />
              <TagLabel fontWeight={600} textTransform='uppercase'>{matcher.status}</TagLabel>
            </Tag>
          </HStack>
          <Button as={Link} to={`/matchers/${matcherId}`} variant='outline' colorScheme='purple' boxShadow='lg'
                  rounded='lg' p={6} leftIcon={<Icon as={AiOutlineExport} boxSize='1.5rem' />}>
            View Matching Quiz
          </Button>
        </HStack>
        <Wrap justify='space-between' boxShadow='lg' spacing={4} p={3}>
          <StatItem label='Students' value={matcher.students.length} icon={HiUser} />
          <StatItem label='Questions' value={matcher.questions.length} icon={HiQuestionMarkCircle} />
          <StatItem label='Publish Date' value={format(matcher.publishDate, 'dd.MM.yyyy HH:mm')} icon={HiCalendar} />
          <StatItem label='Due Date' value={format(matcher.dueDate, 'dd.MM.yyyy HH:mm')} icon={HiCalendar} />
          <ButtonGroup>
            {matcher.status === 'Draft' &&
              <ModalForm fields={['courseName', 'university', 'publishDate', 'dueDate', 'collaborators']} name='Matcher'
                         currentValues={matcher} url={`/matchers/${matcherId}`} variant='edit' allowDelete>
                  <Stack spacing={6}>
                    <NameField fieldName='courseName' icon={AiOutlineAudit}/>
                    <NameField fieldName='university' icon={AiOutlineBank}/>
                    <DateField prefix='publish' />
                    <DateField prefix='due' />
                    <Heading fontSize='xl'>Collaborators</Heading>
                    <CollaboratorsField existingAdmins={matcher.collaborators} />
                  </Stack>
              </ModalForm>}
            <Button as={Link} to='students' colorScheme='green' boxShadow='lg' rounded='lg' p={6} leftIcon={<BiGroup fontSize='1.5rem' />} >
              Manage Students
            </Button>
          </ButtonGroup>
        </Wrap>
        <Flex flexGrow={1} justify='space-between' gap={4}>
          <Stack spacing={4}>
            <HStack justify='space-between'>
              <Heading fontSize='2xl' color='purple.500'>Matching Questions</Heading>
              {matcher.status === 'Draft' &&
                <Button as={Link} to='questions/create' colorScheme='green' size='sm' leftIcon={<FaPlus />}>
                  New Question
                </Button>}
            </HStack>
            {!matcher.questions?.length &&
              <Center minW='lg' p={6} border='2px dashed' borderColor='gray.300' color='gray.400'>
                No questions found.
              </Center>}
            {matcher.questions?.map((question, index) =>
                <HStack borderWidth={2} borderColor='purple.150' p={6} pl={0} minW='lg'>
                  <Center as={Heading} color='purple.300' px={8}>
                    {index+1}
                  </Center>
                  <Stack flexGrow={1}>
                    <Text fontWeight={600}>{question.content}</Text>
                    <HStack>
                      <Tag colorScheme='gray' color='gray.500' textTransform='capitalize'>{question.questionType}</Tag>
                      <ModalForm fields={['answers']} currentValues={question} url={`/questions/${question.id}`}
                                 name='Answers' variant='link'>
                        <ChoiceAnswersField />
                      </ModalForm>
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
                </HStack>)}
          </Stack>
          <Stack spacing={8}>
            <Heading fontSize='2xl' color='purple.500'>Matching Logic</Heading>
            <Stack>
              <HStack>
                <StatIcon icon={HiAdjustments} />
                <Text fontSize='sm' fontWeight={600} flexGrow={1} pr={3}>Optimal Group</Text>
                <Button leftIcon={<AiOutlineSetting />} variant='outline' colorScheme='green' size='xs'>
                  Settings
                </Button>
              </HStack>
              <Table size='sm' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Member</Th>
                    <Th w='full'>Skill</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {[...Array(matcher.groupSize)].map((_, index) =>
                        <Tr key={index}>
                          <Td whiteSpace='nowrap'>Student {index+1}</Td>
                          <Td w='full'>
                            <Select size='sm' w='full'>
                              <option value='python'>Python</option>
                            </Select>
                          </Td>
                        </Tr>
                    )}
                </Tbody>
              </Table>
            </Stack>
            <Stack>
              <HStack>
                <StatIcon icon={HiPuzzle} />
                <Text fontSize='sm' fontWeight={600} flexGrow={1} pr={3}>Strategy</Text>
                <Button leftIcon={<AiOutlineSetting />} variant='outline' colorScheme='green' size='xs'>
                  Settings
                </Button>
              </HStack>
              <Button variant='card' maxW='fit-content'>
                <Heading fontSize='xl'>{matcher.matchingStrategy}</Heading>
                <Text fontSize='xs' fontWeight={400}>
                  Some explanation what does this strategy mean and breakdown of question category strategies
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
  )
}