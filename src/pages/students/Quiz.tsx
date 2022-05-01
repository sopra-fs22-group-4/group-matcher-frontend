import { Icon } from '@chakra-ui/icons'
import {
  Box, Button, Divider, Heading, HStack, Stack, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useLocation } from 'react-router'
import { Navigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { ReactComponent as CheckmarkIllustration } from '../../assets/checkmark.svg'
import { LineBackground } from '../../components/Backgrounds'
import { CircleTab, TabNavButtons } from '../../forms/FormProgress'
import { SingleChoiceAnswers } from '../../forms/Questions'

export default function Quiz() {
  const student = useLocation().state as StudentProps
  const { matcherId } = useParams()
  const { put, response } = useFetch(`/api/matchers/${matcherId}/students/${student?.email}`)
  const toast = useToast()

  const submitAnswers = async (values: FormikValues) => {
    const studentData = await put(Object.values(values))
    toast({ title: response.ok ? 'Saved answers' : studentData.message, status: response.ok ? 'success' : 'error' })
  }

  if (!student)
    return <Navigate to={'/matchers/'+matcherId} />

  const initialValues = Object.assign({}, ...student.questions.map((question) => ({ ['question-'+question.id]: '' })))

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
        <Formik initialValues={initialValues} onSubmit={submitAnswers}>
          {(formProps: FormikProps<any>) =>
              <Tabs as={Form} w={['60%', '50%']} display='flex' flexDir='column' gap={6} variant='solid-rounded'>
                <Stack p={8} bg='white' h='md' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={5}>
                  <TabList as={HStack} justifyContent='space-between' spacing={3} px={6}>
                    {student.questions.map(question => <CircleTab key={question.id} index={question.ordinalNum-1} />)}
                    <CircleTab index={student.questions.length} label='✓' />
                  </TabList>
                  <Divider borderBottomWidth={2} />
                  <TabPanels>
                    {student.questions.map(question =>
                      <TabPanel key={question.id} px={0}>
                        <Heading fontSize='xl' mb={3}>{question.content}</Heading>
                        <SingleChoiceAnswers question={question} />
                      </TabPanel>)}
                    <TabPanel as={VStack} p={1} spacing={3}>
                      <Icon as={CheckmarkIllustration} boxSize='20%' />
                      <Heading fontSize='3xl'>Almost done!</Heading>
                      <Text textAlign='center' color='gray.600' w='sm'>
                        Please review the information you provided previously and when you are ready, click submit.
                      </Text>
                      <Button type='submit' isDisabled={!formProps.dirty || !formProps.isValid} isLoading={formProps.isSubmitting}>Submit</Button>
                    </TabPanel>
                  </TabPanels>
                </Stack>
                <TabNavButtons lastIndex={student.questions.length} />
              </Tabs>}
        </Formik>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )

}