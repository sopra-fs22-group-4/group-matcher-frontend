import { Box, Heading, HStack, TabPanel, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router'
import { Navigate, useParams } from 'react-router-dom'
import { LineBackground } from '../../components/Backgrounds'
import { ConfirmForm } from '../../forms/FormProgress'
import { SingleChoiceAnswers } from '../../forms/QuestionFields'
import StepsForm from '../../forms/StepsForm'

export default function Quiz() {
  const { matcherId } = useParams()
  const student = useLocation().state as StudentProps

  if (!student)
    return <Navigate to={`/matchers/${matcherId}`} />

  return (
      <VStack minH='100vh' minW='fit-content' p={10} spacing={8}>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>{student.courseName || 'Matching Quiz'}</Heading>
          <Box>
            <HStack color='gray.600'>
              <Text fontWeight={500}>Name:</Text>
              <Text>{student.name}</Text>
            </HStack>
            <HStack color='gray.600'>
              <Text fontWeight={500}>Email:</Text>
              <Text>{student.email}</Text>
            </HStack>
          </Box>
        </VStack>
        <StepsForm fields={[]} url={`/api/matchers/${matcherId}/students/${student?.email}`}>
          {student.questions.map(question =>
            <TabPanel key={question.id} px={0}>
              <Heading fontSize='xl' mb={3}>{question.content}</Heading>
              <SingleChoiceAnswers question={question} />
            </TabPanel>)}
          <TabPanel>
            <ConfirmForm />
          </TabPanel>
        </StepsForm>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )

}