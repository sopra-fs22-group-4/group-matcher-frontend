import { Box, Button, ButtonGroup, Heading, HStack, TabPanel, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { useLocation } from 'react-router'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LineBackground } from '../../components/Backgrounds'
import { ConfirmForm } from '../../forms/FormProgress'
import { MultipleChoiceAnswers, SingleChoiceAnswers } from '../../forms/QuestionFields'
import StepsForm from '../../forms/StepsForm'

export default function Quiz() {
  const { matcherId } = useParams()
  const student = useLocation().state as StudentProps

  if (!student)
    return <Navigate to={`/matchers/${matcherId}`} />

  return (
      <VStack minH='100vh' minW='fit-content' p={10} spacing={8}>
        <ButtonGroup w='full'>
          <Button as={Link} to={student.email ? '/' : '/dashboard/matchers/'+matcherId} variant='ghost' color='purple.400'
                  leftIcon={<FaRegArrowAltCircleLeft />}>
            Back
          </Button>
        </ButtonGroup>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>{student.courseName || 'Matching Quiz'}</Heading>
          <Box>
            <HStack color='gray.600'>
              <Text fontWeight={500}>Name:</Text>
              <Text>{student.name || 'Student'}</Text>
            </HStack>
            <HStack color='gray.600'>
              <Text fontWeight={500}>Email:</Text>
              <Text>{student.email || 'student@email.com'}</Text>
            </HStack>
          </Box>
        </VStack>
        <StepsForm fields={[]} url={`/api/matchers/${matcherId}/students/${student?.email}`} flatten>
          {student.questions.map(question =>
            <TabPanel key={question.id} px={0}>
              <Heading fontSize='xl' mb={3}>{question.content}</Heading>
              {question.questionType === 'Single Choice'
                  ? <SingleChoiceAnswers question={question} />
                  : <MultipleChoiceAnswers question={question} />}
            </TabPanel>)}
          <TabPanel>
            <ConfirmForm isDisabled={!student.email} />
          </TabPanel>
        </StepsForm>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )

}