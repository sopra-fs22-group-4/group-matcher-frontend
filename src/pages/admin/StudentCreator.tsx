import {
  Button, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text, useDisclosure, useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { FileUploader, StudentsField } from '../../forms/MatcherSettings'
import { baseSchema } from '../../forms/Schemas'

export default function StudentCreator() {
  const { matcherId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post, response } = useFetch(`/matchers/${matcherId}/students`)
  const toast = useToast()
  const schema = baseSchema.pick(['students'])

  const addStudents = async (values: FormikValues) => {
    const matcherData = await post(values.students)
    response.ok ? window.location.reload() : toast({ title: matcherData.message, status: 'error' })
  }
  return (
      <HStack justify='space-between'>
        <Heading fontSize='2xl' color='purple.400'>Students</Heading>
        <Button colorScheme='green' variant='ghost' px={4} py={2} size='sm' fontWeight={400}
                color='white' bg='green.500' _hover={{ bg: 'green.400' }} onClick={onOpen}>Add</Button>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={addStudents}>
            <ModalContent>
              <ModalHeader>Add Students</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={Form} textAlign='center'>
                <FileUploader />
                <Text>or</Text>
                <StudentsField />
              </ModalBody>
              <ModalFooter justifyContent='center'>
                <Button type='submit'>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Formik>
        </Modal>
      </HStack>
  )
}