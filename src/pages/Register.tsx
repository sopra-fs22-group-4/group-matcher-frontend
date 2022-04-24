import { Button, ButtonGroup, Heading, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { GrUndo } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { EmailField, NameField, PasswordField } from '../forms/AuthFields'
import { baseSchema } from '../forms/Schemas'

export default function Register() {
  const { post, response } = useFetch()
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['name', 'email', 'password', 'repeatPassword'])

  const register = async (values: FormikValues) => {
    const adminData = await post('/register', values)
    response.ok ? navigate('/') : toast({ title: adminData.message, status: 'error' })
  }

  return (
      <VStack h='100vh' justify='center' spacing={12} color='blue.700'>
        <VStack>
          <Heading>Register</Heading>
          <Text>Register in order to gain full access to all features of GroupMatcher.</Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={register}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={8}>
                <NameField icon={AiOutlineUser} />
                <EmailField />
                <PasswordField/>
                <PasswordField repeat/>
                <ButtonGroup pt={10}>
                  <Button type='submit' isLoading={formProps.isSubmitting} isDisabled={!formProps.isValid}>Register</Button>
                </ButtonGroup>
              </VStack>}
        </Formik>
        <Button as={Link} to='/' leftIcon={<GrUndo />} variant='ghost'>Back</Button>
      </VStack>
  )
}