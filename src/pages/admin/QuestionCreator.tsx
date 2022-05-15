import { Heading, Stack, TabPanel, Text, VStack } from '@chakra-ui/react'
import StepsForm from 'forms/StepsForm'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LineBackground } from '../../components/Backgrounds'
import { ConfirmForm } from '../../forms/FormProgress'
import { ChoiceBasedQuestion, QuestionContentField, SelectionField } from '../../forms/QuestionFields'

export default function QuestionCreator() {
  const { matcherId } = useParams()
  const fields = ['content', 'questionType', 'questionCategory', 'answers']

  return (
      <VStack flexGrow={1} p={4} spacing={5} position='relative'>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>Create Matching Question</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='md'>
            Add here a question for your students. We will match students into groups based on their answers.
          </Text>
        </VStack>
        <StepsForm fields={fields} url={`/matchers/${matcherId}/questions`}>
          <TabPanel px={0}>
            <Stack mb={8}>
              <Heading fontSize='2xl'>Select question type</Heading>
              <SelectionField name='questionType' />
            </Stack>
            <Stack>
              <Heading fontSize='2xl'>Select question category</Heading>
              <SelectionField name='questionCategory' />
            </Stack>
          </TabPanel>
          <TabPanel as={Stack} px={0} spacing={3}>
            <Heading fontSize='3xl'>Question Details</Heading>
            <QuestionContentField />
            <ChoiceBasedQuestion />
          </TabPanel>
          <TabPanel>
            <ConfirmForm />
          </TabPanel>
        </StepsForm>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )
}