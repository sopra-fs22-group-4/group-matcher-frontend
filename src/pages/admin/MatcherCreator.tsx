import { Icon } from '@chakra-ui/icons'
import {
  Button, Divider, Heading, HStack, SimpleGrid, Stack, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack
} from '@chakra-ui/react'
import { ReactComponent as CheckmarkIllustration } from 'assets/checkmark.svg'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import { NameField } from 'forms/AuthFields'
import { CircleTab, TabNavButtons, TabProgress } from 'forms/FormProgress'
import { DateField, FileUploader, GroupSizeField, MatchingLogicField } from 'forms/MatcherSettings'
import { baseSchema } from 'forms/Schemas'
import React, { useEffect } from 'react'
import { AiOutlineAudit, AiOutlineBank } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { LineBackground } from '../../components/Backgrounds'

export default function MatcherCreator() {
  const { post, response } = useFetch('/matchers')
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['courseName', 'university', 'publishDate', 'dueDate', 'groupSize'])

  // Forces the page to reload when MatcherCreator is unmounted, allowing the new data
  // to be correctly displayed in the Overview component. Yes I hate this
  useEffect(() => () => window.location.reload(),[])

  const createMatcher = async (values: FormikValues) => {
    const matcherData = await post(values)
    response.ok ? navigate('/dashboard') : toast({ title: matcherData.message, status: 'error' })
  }

  return (
      <VStack flexGrow={1} p={4} spacing={5} position='relative'>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>Create Group Matcher</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='md'>
            Creating a group matcher is really easy. Just follow the steps below and build awesome teams.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={createMatcher}>
          {(formProps: FormikProps<any>) =>
              <Tabs as={Form} w={['70%', '60%']} display='flex' flexDir='column' gap={6} variant='solid-rounded'>
                <Stack p={8} bg='white' h='md' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={5}>
                  <TabList as={HStack} justifyContent='space-between' spacing={3} px={6}>
                    <CircleTab index={0} />
                    <TabProgress index={0} />
                    <CircleTab index={1} />
                    <TabProgress index={1} />
                    <CircleTab index={2} />
                    <TabProgress index={2} />
                    <CircleTab index={3} />
                  </TabList>
                  <Divider borderBottomWidth={2} />
                  <TabPanels>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl'>Matcher Details</Heading>
                      <Text color='gray.600'>Please fill your information so we can get in touch with you.</Text>
                      <SimpleGrid columns={2} spacing={6} py={6}>
                        <NameField fieldName='courseName' icon={AiOutlineAudit}/>
                        <NameField fieldName='university' icon={AiOutlineBank}/>
                        <DateField prefix='publish' />
                        <DateField prefix='due' />
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl'>Students</Heading>
                      You can restrict the access to the matching quiz to specific students by providing their e-mail addresses.
                      <FileUploader />
                    </TabPanel>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl'>How should groups be matched?</Heading>
                      We will optimize the matching process based on your preferences.
                      <MatchingLogicField />
                      <GroupSizeField />
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
                <TabNavButtons lastIndex={3} />
              </Tabs>}
        </Formik>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )
}