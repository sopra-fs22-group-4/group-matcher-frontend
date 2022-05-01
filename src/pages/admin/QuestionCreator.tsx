import { Icon } from '@chakra-ui/icons'
import {
  Button, Divider, Heading, HStack, Stack, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { useEffect } from 'react'
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

  useEffect(() => () => window.location.reload(),[]) // See MatcherCreator for comment

  const createQuestion = async (values: FormikValues) => {
    const questionData = await post(values)
    response.ok ? navigate('/dashboard/matchers/'+matcherId) : toast({ title: questionData.message, status: 'error' })
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
              <Tabs as={Form} w={['70%', '60%']} display='flex' flexDir='column' gap={6} variant='solid-rounded'>
                <Stack p={10} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={5}>
                  <TabList as={HStack} justifyContent='space-between' spacing={3} px={6}>
                    <CircleTab index={0} />
                    <TabProgress index={0} />
                    <CircleTab index={1} />
                    <TabProgress index={1} />
                    <CircleTab index={2} />
                  </TabList>
                  <Divider borderBottomWidth={2} />
                  <TabPanels>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl' mb={5}>Select question type</Heading>
                      <QuestionTypeField />
                    </TabPanel>
                    <TabPanel as={Stack} px={0} spacing={3}>
                      <Heading fontSize='3xl'>Question Details</Heading>
                      <QuestionContentField />
                      <ChoiceBasedQuestion />
                    </TabPanel>
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
                <TabNavButtons lastIndex={2} />
              </Tabs>}
        </Formik>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )
}