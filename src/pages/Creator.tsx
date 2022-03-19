import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, SlideFade,
  useToast, VStack
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { object, string } from 'yup'

export default function Creator() {
  const { get, post, response } = useFetch('/matchers')
  const navigate = useNavigate()
  const toast = useToast()
  const isAvailable = async (userInput: string) => (await get(userInput)).error
  const schema = object({ name: string().ensure().required().min(3, 'Too short').max(6, 'Too long')
        .test('is-available', context => `Name ${context.value} is not available`, isAvailable) })

  const onSubmit = async (values: FormikValues) => {
      await post('/new', values)
      toast({ title: 'Posted', description: response.status, status: response.ok ? 'success' : 'error' })
  }

  return (
      <SlideFade in offsetY='20px'>
        <Heading m={4}>Matcher Form</Heading>
        <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={onSubmit}>
          {(formProps: FormikProps<any>) =>
            <VStack as={Form} spacing={5}>
              <Field name='name' children={(fieldProps: FieldProps) =>
                <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    <InputLeftAddon><Icon as={FiEdit2} /></InputLeftAddon>
                    <Input {...fieldProps.field} />
                  </InputGroup>
                  <FormErrorMessage justifyContent='end'>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                </FormControl>} />
              <ButtonGroup>
                <Button type='submit' disabled={formProps.isSubmitting || !!formProps.errors.name}>Create</Button>
                <Button colorScheme='purple' onClick={() => navigate(`/find/${formProps.values.name}`)}>Find</Button>
              </ButtonGroup>
            </VStack>}
        </Formik>
      </SlideFade>
  )
}
