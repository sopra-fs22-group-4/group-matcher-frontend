import { Button, Flex, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { GrUndo } from 'react-icons/gr'
import { Link, Navigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { LineBackground } from '../components/Backgrounds'
import { EmailField, PasswordField } from '../forms/AuthFields'
import { baseSchema } from '../forms/Schemas'

export default function Login() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
  const { post, response } = useFetch('/api/login')
  const toast = useToast()
  const schema = baseSchema.pick(['email', 'password'])

  if (adminData?.id)
    return <Navigate to='/dashboard' />

  const login = (values: FormikValues) => post(values).then(data =>
      response.ok ? setAdminData(data) : toast({ title: data.message, status: 'error' }))

  return (
      <VStack minH='100vh' minW='fit-content' p={4} spacing={12} position='relative' justify='center'>
        <VStack>
          <Heading>Login</Heading>
          <Text textAlign='center' w='md' color='gray.600'>
            Login to your personal account to view and manage your ongoing and past group matching projects.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} onSubmit={login}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={8}>
                <Flex gap={5} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} px={10} py={6}>
                  <EmailField />
                  <PasswordField />
                </Flex>
                <HStack spacing={6} justifyContent='end' w='full'>
                  <Flex gap={1}>
                    <Text>Don't have an account yet?</Text>
                    <Button as={Link} to='/register' variant='link' size='sm'>Register</Button>
                    <Text>now!</Text>
                  </Flex>
                  <Button variant='round' px={8} py={6} type='submit' isDisabled={!formProps.dirty || !formProps.isValid}
                          isLoading={formProps.isSubmitting}>Login</Button>
                </HStack>
              </VStack>}
        </Formik>
        <Button as={Link} to='/' leftIcon={<GrUndo />} variant='ghost'>Back</Button>
        <LineBackground transform='scaleY(-1)' viewBox='-1400 0 1500 500' />
      </VStack>
  )
}