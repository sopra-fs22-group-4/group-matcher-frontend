import { Icon } from '@chakra-ui/icons'
import {
  Button, Divider, Heading, HStack, Stack, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { ReactComponent as CheckmarkIllustration } from '../../assets/checkmark.svg'
import { LineBackground } from '../../components/Backgrounds'
import { CircleTab, TabNavButtons, TabProgress } from '../../forms/FormProgress'
import { ChoiceBasedQuestion, QuestionContentField, QuestionTypeField } from '../../forms/Questions'
import { baseSchema } from '../../forms/Schemas'

export default function QuestionCreator() {
  const { matcherId } = useParams()
  const { post, response } = useFetch(`/matchers/${matcherId}/questions`)
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['content', 'questionType', 'answers'])

  const createQuestion = async (values: FormikValues) => {
    const questionData = await post(values)
    response.ok ? navigate('/dashboard') : toast({
      title: questionData.message,
      description: response.status,
      status: 'error'
    })
  }

  return (
      <VStack flexGrow={1} p={4} spacing={5} position='relative'>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>Create Matching Question</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='md'>
            Add here a question for your students. We will match students into groups based on their answers.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={createQuestion}>
          {(formProps: FormikProps<any>) =>
              <Tabs as={Form} display='flex' flexDir='column' gap={10} variant='solid-rounded'>
                <Stack p={10} h='xl' w='2xl' bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={8}>
                  <TabList as={HStack} justifyContent='space-between' spacing={5} px={6}>
                    <CircleTab index={0} />
                    <TabProgress index={0} />
                    <CircleTab index={1} />
                    <TabProgress index={1} />
                    <CircleTab index={2} />
                  </TabList>
                  <Divider borderBottomWidth={2} />
                  <TabPanels>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl'>Select question type</Heading>
                      <QuestionTypeField />
                    </TabPanel>
                    <TabPanel as={Stack} px={0} spacing={5}>
                      <Heading fontSize='3xl'>Question Details</Heading>
                      <QuestionContentField />
                      <ChoiceBasedQuestion />
                    </TabPanel>
                    <TabPanel as={VStack} spacing={6}>
                      <Icon as={CheckmarkIllustration} boxSize='10rem' />
                      <Heading fontSize='3xl'>Almost done!</Heading>
                      <Text textAlign='center' color='gray.600' w='sm'>
                        Please review the information you provided previously and when you are ready, click submit.
                      </Text>
                      <Button type='submit' isDisabled={!formProps.errors} isLoading={formProps.isSubmitting}>Submit</Button>
                    </TabPanel>
                  </TabPanels>
                </Stack>
                <TabNavButtons lastIndex={3} />
              </Tabs>}
        </Formik>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
      // <VStack h='100vh' justify='center' spacing={10}>
      //   <Heading color='blue.500'>Form for Creating A Question</Heading>
      //   <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={createQuestion}>
      //     {(formProps: FormikProps<any>) =>
      //         <VStack as={Form} spacing={8}>
      //           <QuestionTitleField />
      //
      //
      //           <ButtonGroup>
      //             <Button colorScheme='blue' px={10} type='submit'>Post Question</Button>
      //           </ButtonGroup>
      //         </VStack>}
      //   </Formik>
      // </VStack>
  )
}