import { ButtonGroup, Button, Heading, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import  { QuestionTitleField, QuestionTypeField, ChoiceBasedQuestion } from '../forms/Questions'
import { baseSchema } from '../forms/Schemas'

export default function QuestionCreator() {
  const { post, response } = useFetch()
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['question'])

  const createQuestion = async (values: FormikValues) => {
    const questionData = await post('/register', values)
    response.ok ? navigate('/dashboard') : toast({
      title: questionData.message,
      description: response.status,
      status: 'error'
    })
  }

  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <Heading color='blue.500'>Form for Creating A Question</Heading>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={createQuestion}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={8}>
                <QuestionTitleField />
                <QuestionTypeField />
                <ChoiceBasedQuestion />
                <ButtonGroup>
                    <Button colorScheme='blue' px={10} type='submit'>Post Question
                    </Button>
                </ButtonGroup>
              </VStack>}         
        </Formik>
      </VStack>
  )
}