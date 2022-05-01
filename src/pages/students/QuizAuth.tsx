import { Icon } from '@chakra-ui/icons'
import { Button, Center, Heading, HStack, Spinner, Text, useToast, VStack } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { ReactComponent as WindowIllustration } from '../../assets/window.svg'
import { LineBackground } from '../../components/Backgrounds'
import { EmailField, NameField } from '../../forms/AuthFields'
import { baseSchema } from '../../forms/Schemas'

export default function QuizAuth() {
  const { matcherId } = useParams()
  const { post, response } = useFetch(`/api/matchers/${matcherId}/students/`)
  const { data: matcher } = useFetch(`/api/matchers/${matcherId}`, {}, [])
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(['name', 'email'])

  const verifyStudent = async (values: FormikValues) => {
    const studentData = await post(values)
    response.ok ? navigate('quiz', { state: studentData }) : toast({ title: studentData.message, status: 'error' })
  }

  if (!matcher)
    return <Center h='100vh'><Spinner /></Center>

  if (!matcher?.id)
    return <Navigate to='/404' />

  return (
      <VStack minH='100vh' minW='fit-content' p={10} spacing={8}>
        <VStack>
          <Heading>Welcome to groupmatcher!</Heading>
          <Text color='gray.600' textAlign='center' lineHeight={1.5} w='lg'>
            In order to access the matching quiz, we first need to validate your email address. Please provide it below.
          </Text>
        </VStack>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={verifyStudent}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={6} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} py={8} px={16}>
                <Icon as={WindowIllustration} boxSize='8rem' />
                <Heading fontSize='2xl'>{matcher.courseName}</Heading>
                <Text color='blue.500' fontWeight={600}>Deadline: {parseISO(matcher.dueDate).toLocaleDateString()}</Text>
                <HStack pb={2}>
                  <NameField icon={AiOutlineUser} />
                  <EmailField />
                </HStack>
                <Button px={8} py={6} type='submit' isLoading={formProps.isSubmitting}>Access Matcher</Button>
              </VStack>}
        </Formik>
        <LineBackground transform='scaleY(-1)' viewBox='-1400 0 1500 500' />
      </VStack>
  )
}