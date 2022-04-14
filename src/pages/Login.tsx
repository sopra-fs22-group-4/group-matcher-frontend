import { Box, Button, Flex, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { GrUndo } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { EmailField, PasswordField } from '../forms/AuthFields'
import { baseSchema } from '../forms/Schemas'

export default function Login() {
  const { post, response } = useFetch()
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['email', 'password'])

  const login = async (values: FormikValues) => {
    const adminData = await post('/login', values)
    response.ok ? navigate('/dashboard') : toast({
      title: adminData.message,
      description: response.status,
      status: 'error'
    })
  }

  return (
      <VStack h='100vh' justify='center' spacing={12} fontFamily='heading' color='blue.700'>
        <VStack>
          <Heading>Login</Heading>
          <Text>Login to your personal account to view and manage your matchers.</Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} onSubmit={login}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={8}>
                <Flex gap={5}>
                  <EmailField />
                  <Box w='full'>
                    <PasswordField />
                    <Button as={Link} to='reset' variant='link' size='xs' isFullWidth justifyContent='end'>
                      Forgot Password?
                    </Button>
                  </Box>
                </Flex>
                <HStack spacing={6} justifyContent='end' w='full'>
                  <Flex gap={1}>
                    <Text>Don't have an account yet?</Text>
                    <Button as={Link} to='/register' colorScheme='blue' variant='link' size='sm'>Register</Button>
                    <Text>now!</Text>
                  </Flex>
                  <Button px={8} py={6} type='submit' colorScheme='blue' isLoading={formProps.isSubmitting}>Login</Button>
                </HStack>
              </VStack>}
        </Formik>
        <Button as={Link} to='/' leftIcon={<GrUndo />} variant='ghost'>Back</Button>
      </VStack>
  )
}