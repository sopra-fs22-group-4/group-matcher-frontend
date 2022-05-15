import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, Center, Flex, Heading, HStack, IconButton, Select, Spinner, Stack, StatGroup, Table, Tag,
  TagLabel, Tbody, Td, Text, Th, Thead, Tr, useBoolean, useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import React from 'react'
import { AiOutlineCheck, AiOutlineEdit, AiOutlineSetting } from 'react-icons/ai'
import { BiGroup, BiUserMinus, BiUserPlus } from 'react-icons/bi'
import { BsCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { HiAdjustments, HiPuzzle, HiQuestionMarkCircle, HiUser } from 'react-icons/hi'
import { VscAdd } from 'react-icons/vsc'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { StatIcon, StatItem } from '../../components/Buttons'
import { DateEditor } from '../../forms/MatcherFields'
import ModalForm from '../../forms/ModalForm'
import { QuestionContentField, SelectionField } from '../../forms/QuestionFields'

export default function Matcher() {
  const { matcherId } = useParams()
  const { data: matcher, put, error } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [matcherId])
  const [isEditing, { on, off }] = useBoolean()
  const toast = useToast()

  if (!matcher?.id)
    return <Center flexGrow={1}><Spinner /></Center>

  const updateMatcher = (values: FormikValues) => {
    if (isEditing)
      put(values)
          .then(() => { off(); toast({ status: 'success', title: `Successfully updated!` }) })
          .catch(() => toast({ status: 'error', title: error?.message }))
    else on()
  }

  return (
      <Stack flexGrow={1} spacing={8} p={10}>
        <HStack justify='space-between'>
          <HStack spacing={4}>
            <Heading fontSize='3xl'>{matcher.courseName}</Heading>
            <Tag color='gray.400' bg='none' size='sm' gap={2}>
              <Icon as={BsCircleFill} boxSize={2} />
              <TagLabel fontWeight={600} textTransform='uppercase'>{matcher.status}</TagLabel>
            </Tag>
            <Tag color='purple.400' bg='none' size='sm' gap={2}>
              <Icon as={BsCircleFill} boxSize={2} />
              <TagLabel fontWeight={600}>2 ONLINE</TagLabel>
            </Tag>
          </HStack>
        </HStack>
        <Formik initialValues={matcher} onSubmit={updateMatcher}>
          <StatGroup as={Form} boxShadow='lg' p={3}>
            <StatItem label='Students' value={matcher.students.length} icon={HiUser} />
            <StatItem label='Questions' value={matcher.questions.length} icon={HiQuestionMarkCircle} />
            <DateEditor prefix='publish' disable={!isEditing} />
            <DateEditor prefix='due' disable={!isEditing} />
            <ButtonGroup colorScheme='green'>
              <Button variant='outline' boxShadow='lg' rounded='lg' p={6} type='submit'
                      leftIcon={<Icon as={isEditing ? AiOutlineCheck : AiOutlineEdit} boxSize='1.5rem' />}>
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button as={Link} to='students' boxShadow='lg' rounded='lg' p={6} leftIcon={<BiGroup fontSize='1.5rem' />} >
                Manage Students
              </Button>
            </ButtonGroup>
          </StatGroup>
        </Formik>
        <Flex flexGrow={1} justify='space-between' gap={4}>
          <Stack spacing={4}>
            <HStack justify='space-between'>
              <Heading fontSize='2xl' color='purple.500'>Matching Questions</Heading>
              <Button as={Link} to='questions/create' colorScheme='green' size='sm' leftIcon={<FaPlus />}>
                New Question
              </Button>
            </HStack>
            {matcher.questions?.map(question =>
                <HStack key={question.id} borderWidth={2} borderColor='purple.150' p={6} pl={0} minW='lg'>
                  <Center as={Heading} color='purple.300' px={8}>
                    {question.ordinalNum}
                  </Center>
                  <Stack flexGrow={1}>
                    <Text fontWeight={600}>{question.content}</Text>
                    <HStack>
                      <Tag colorScheme='gray' color='gray.500' textTransform='capitalize'>{question.questionType}</Tag>
                      <Button variant='link' textDecoration='underline 1px'>
                        {question.answers?.length || 0} Answers
                      </Button>
                    </HStack>
                  </Stack>
                  <ModalForm defaults={question} fields={['content', 'questionType', 'questionCategory']}
                             url={`/matchers/${matcherId}/questions/${question.id}`} title='Edit Question'
                             buttonStyle={{ leftIcon: <AiOutlineEdit fontSize='1.5rem' />, variant: 'ghost', children: '' }}>
                    <Stack spacing={6}>
                      <QuestionContentField />
                      <SelectionField name='questionType' />
                      <SelectionField name='questionCategory' />
                    </Stack>
                  </ModalForm>
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