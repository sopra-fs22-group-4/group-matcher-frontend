import { Heading, SimpleGrid, TabPanel, Text, VStack } from '@chakra-ui/react'
import { NameField } from 'forms/AuthFields'
import { CollaboratorsField, DateField, GroupSizeField, MatchingStrategyField } from 'forms/MatcherFields'
import React from 'react'
import { AiOutlineAudit, AiOutlineBank } from 'react-icons/ai'
import { LineBackground } from '../../components/Backgrounds'
import { ConfirmForm } from '../../forms/FormProgress'
import StepsForm from '../../forms/StepsForm'

export default function MatcherCreator() {
  const fields = ['courseName', 'university', 'publishDate', 'dueDate', 'groupSize', 'collaborators', 'matchingStrategy']

  return (
      <VStack flexGrow={1} p={4} spacing={5} position='relative'>
        <VStack spacing={4} bg='white' p={2}>
          <Heading fontSize='3xl'>Create Group Matcher</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='md'>
            Creating a group matcher is really easy. Just follow the steps below and build awesome teams.
          </Text>
        </VStack>
        <StepsForm fields={fields} url='/matchers'>
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
            <Heading fontSize='3xl'>Add Collaborators</Heading>
            Please provide the names and Emails of the people you would like to collaborate with
            when creating and managing this matcher. All your collaborators will be able to create questions
            and see the matching results.
            <CollaboratorsField />
          </TabPanel>
          <TabPanel px={0}>
            <Heading fontSize='3xl'>How should groups be matched?</Heading>
            We will optimize the matching process based on your preferences.
            <MatchingStrategyField />
            <GroupSizeField />
          </TabPanel>
          <TabPanel>
            <ConfirmForm />
          </TabPanel>
        </StepsForm>
        <LineBackground viewBox='400 200 1500 500' />
      </VStack>
  )
}