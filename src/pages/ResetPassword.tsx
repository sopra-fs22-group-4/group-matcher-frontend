import { Icon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { ReactComponent as WindowIllustration } from '../assets/window.svg'
import { LineBackground } from '../components/Backgrounds'
import { PasswordField } from '../forms/AuthFields'
import { baseSchema } from '../forms/Schemas'

export default function ResetPassword() {
  const { adminId } = useParams()
  const navigate = useNavigate()
  const schema = baseSchema.pick(['password', 'repeatPassword'])
  const { put, response } = useFetch(`/api/admins/${adminId}/profile`)
  const [_, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
  const toast = useToast()

  const resetPassword = (values: FormikValues) => put(values).then(data => {
    setAdminData(data)
    const redirectURL = data?.verified ? '/dashboard' : `/verify/${adminId}`
    response.ok ? navigate(redirectURL) : toast({ title: data.message, status: 'error' })
  })

  return (
      <VStack minH='100vh' minW='fit-content' p={10} spacing={8}>
        <VStack>
          <Heading>Hi! You are almost able to access group matcher!</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='lg'>
            In order to gain full access to your account, we need you to complete your registration by providing a password.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={resetPassword}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={6} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} py={8} px={16}>
                <Icon as={WindowIllustration} boxSize='8rem' />
                <HStack pb={2}>
                  <PasswordField />
                  <PasswordField repeat />
                </HStack>
                <Button variant='round' type='submit' isLoading={formProps.isSubmitting}>Finish Registration</Button>
              </VStack>}
        </Formik>
        <LineBackground transform='scaleY(-1)' viewBox='-1400 0 1500 500' />
      </VStack>
  )
}