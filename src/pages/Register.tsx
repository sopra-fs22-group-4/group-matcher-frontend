import { Icon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Heading, SimpleGrid, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { GrUndo } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { ReactComponent as BackgroundIllustration } from '../assets/bg.svg'
import { EmailField, NameField, PasswordField } from '../forms/AuthFields'
import { baseSchema } from '../forms/Schemas'

export default function Register() {
  const { post, response } = useFetch('/register')
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['name', 'email', 'password', 'repeatPassword'])

  const register = async (values: FormikValues) => {
    const adminData = await post(values)
    response.ok ? navigate('/') : toast({ title: adminData.message, status: 'error' })
  }

  return (
      <VStack h='100vh' justify='center' position='relative' overflow='hidden' spacing={12}>
        <VStack>
          <Heading>Register</Heading>
          <Text textAlign='center' w='md' color='gray.600'>
            You need to register in order to create matching forms.
            Please provide your contact information below.
          </Text>
        </VStack>
        <Icon as={BackgroundIllustration} boxSize='max-content' position='absolute' transform='scaleY(-1)' right='-80%' top='-25%' zIndex={-1} />
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={register}>
          {(formProps: FormikProps<any>) =>
              <VStack align='end' as={Form} spacing={10}>
                <SimpleGrid spacing={8} columns={2} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} p={10} pt={6}>
                  <NameField icon={AiOutlineUser} />
                  <EmailField />
                  <PasswordField/>
                  <PasswordField repeat/>
                </SimpleGrid>
                <ButtonGroup>
                  <Button type='submit' isLoading={formProps.isSubmitting} isDisabled={!formProps.isValid}>Register</Button>
                </ButtonGroup>
              </VStack>}
        </Formik>
        <Button as={Link} to='/' leftIcon={<GrUndo />} variant='ghost'>Back</Button>
      </VStack>
  )
}