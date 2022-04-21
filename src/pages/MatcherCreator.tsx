import { Icon } from '@chakra-ui/icons'
import {
  Button, Divider, Heading, HStack, SimpleGrid, Stack, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import { NameField } from 'forms/AuthFields'
import React from 'react'
import { AiOutlineAudit, AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { ReactComponent as BackgroundIllustration } from 'assets/bg.svg'
import { ReactComponent as CheckmarkIllustration } from 'assets/checkmark.svg'
import { CircleTab, TabNavButtons, TabProgress } from '../forms/FormProgress'
import { DateField, ParticipantsField } from '../forms/MatcherSettings'
import { baseSchema } from '../forms/Schemas'

export default function MatcherCreator() {
  const { post, response } = useFetch()
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['courseName', 'projectName', 'startDate', 'endDate', 'yourName', 'email', 'password'])

  const createMatcher = async (values: FormikValues) => {
    const matcherData = await post('/register', values)
    response.ok ? navigate('/dashboard') : toast({
      title: matcherData.message,
      description: response.status,
      status: 'error'
    })
  }

  return (
      <VStack h='100vh' overflow='hidden' position='relative' spacing={12}>
        <Icon as={BackgroundIllustration} boxSize='max-content' position='absolute' left='-45%' top='-40%' zIndex={-1} />
        <VStack spacing={4}>
          <Heading fontSize='3xl'>Create Group Matcher</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='md'>
            Creating a group matcher is really easy. Just follow the steps below and build awesome teams.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={createMatcher}>
          {(formProps: FormikProps<any>) =>
              <Tabs as={Form} display='flex' flexDir='column' gap={10} variant='solid-rounded'>
                <Stack p={10} h='xl' w='2xl' bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={8}>
                  <TabList as={HStack} justifyContent='space-between' spacing={5} px={6}>
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
                      <SimpleGrid columns={2} spacing={8} py={10}>
                        <NameField prefix='course' icon={AiOutlineAudit}/>
                        <NameField prefix='project' icon={AiOutlineFundProjectionScreen}/>
                        <DateField prefix='publish' />
                        <DateField prefix='due' />
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel px={0}>
                      <Heading fontSize='3xl'>Participants</Heading>
                      Upload e-mail addresses
                      <ParticipantsField />
                    </TabPanel>
                    <TabPanel px={0}>
                    </TabPanel>
                    <TabPanel as={VStack} spacing={6}>
                      <Icon as={CheckmarkIllustration} boxSize='10rem' />
                      <Heading fontSize='3xl'>Almost done!</Heading>
                      <Text textAlign='center' color='gray.600' w='sm'>
                        Please review the information you provided previously and when you are ready, click submit.
                      </Text>
                      <Button type='submit' isLoading={formProps.isSubmitting}>Submit</Button>
                    </TabPanel>
                  </TabPanels>
                </Stack>
                <TabNavButtons lastIndex={3} />
              </Tabs>}
        </Formik>
      </VStack>
  )
}