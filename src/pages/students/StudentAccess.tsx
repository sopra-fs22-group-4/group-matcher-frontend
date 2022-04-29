import { Button, Heading, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { EmailField } from '../../forms/AuthFields'

export default function StudentAccess() {
  const { matcherId } = useParams()
  const { data: matcher, get, response } = useFetch(`/matchers/${matcherId}`, {}, [])
  const navigate = useNavigate()
  const toast = useToast()

  const studentAccess = async (values: FormikValues) => {
    const accessResponse = await get('/students/' + values.email)
    response.ok ? navigate('/quiz') : toast({ title: accessResponse.message, status: 'error' })
  }

  return (
      <VStack h="100vh" justify="center" color="blue.700" spacing={10}>
        <VStack>
          <Heading>Welcome to groupmatcher!</Heading>
          <Heading>In order to access the matching quiz, we first need to validate your email address. Please provide it below.</Heading>
        </VStack>
        <Formik initialValues={{}} onSubmit={studentAccess}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={10}>
                <EmailField/>
                <Button px={8} py={6} type="submit" isLoading={formProps.isSubmitting}>Access Matcher</Button>
              </VStack>}
        </Formik>
      </VStack>
  )
}
