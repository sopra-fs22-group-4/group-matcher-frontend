import {
  Button, ButtonProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  useDisclosure, useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { ReactNode } from 'react'
import { useFetch } from 'use-http'
import { baseSchema } from './Schemas'

type ModalFormProps = { fields: any, defaults?: object, url: string, title: string, children: ReactNode, buttonStyle: ButtonProps }

export default function ModalForm({ fields, defaults, url, title, children, buttonStyle }: ModalFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post, response } = useFetch(url)
  const schema = baseSchema.pick(fields)
  const toast = useToast()

  const onSubmit = (values: FormikValues) =>
      post(values).then(() => { if (response.ok) onClose() })
          .catch(() => toast({ title: response.data.message, status: 'error' }))

  return (
      <>
        <Button onClick={onOpen} children={title} {...buttonStyle} />
        <Modal size='lg' isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <Formik initialValues={defaults || schema.getDefaultFromShape()} validationSchema={schema} onSubmit={onSubmit}>
            {(formProps: FormikProps<any>) =>
                <ModalContent as={Form}>
                  <ModalHeader>{title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {children}
                  </ModalBody>
                  <ModalFooter justifyContent='center'>
                    <Button variant='round' type='submit' isDisabled={!formProps.errors} isLoading={formProps.isSubmitting}>
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>}
          </Formik>
        </Modal>
      </>
  )

}