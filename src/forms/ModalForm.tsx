import {
  Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  useDisclosure, useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import { pick } from 'lodash'
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import DeleteForm from './DeleteForm'
import { baseSchema } from './Schemas'

export default function ModalForm({ fields, currentValues, url, name, children, variant, allowDelete }: ModalFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { put, response } = useFetch(url)
  const toast = useToast()
  const navigate = useNavigate()
  const schema = baseSchema.pick(fields)
  const initialValues = currentValues ? pick(currentValues, fields) : schema.getDefaultFromShape()
  const buttonProps: Record<string, object> = {
    'edit': { leftIcon: <AiOutlineEdit fontSize='1.5rem' />, children: 'Edit', variant: 'outline', colorScheme: 'green', p: 6 },
    'add': { leftIcon: <FaPlus fontSize='1.5rem' />, children: 'Add '+name, colorScheme: 'green' },
    'link': { variant: 'link', textDecoration: 'underline 1px', children: (currentValues?.answers?.length || 0) + ' Answers' }
  }

  const onSubmit = (values: FormikValues) => put(values).then(data => {
    if (response.ok) {
      toast({ status: 'success', title: `Successfully updated!` })
      navigate(0)
    }
    else toast({ title: data.message, status: 'error' })
  })

  return (
      <>
        {(variant === 'icon')
            ? <IconButton aria-label='edit' onClick={onOpen} icon={<AiOutlineEdit />} size='lg' variant='ghost' />
            : <Button onClick={onOpen} {...buttonProps[variant]} />}
        <Modal size='lg' isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
            {(formProps: FormikProps<any>) =>
                <ModalContent minW='fit-content' as={Form}>
                  <ModalHeader textAlign='center'>{variant === 'add' ? 'Add' : 'Edit'} {name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {children}
                  </ModalBody>
                  <ModalFooter justifyContent={allowDelete ? 'space-between' : 'center'}>
                    {allowDelete && <DeleteForm name={name} url={url} />}
                    <Button variant='round' type='submit' isDisabled={!formProps.dirty || !formProps.isValid}
                            isLoading={formProps.isSubmitting}>
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>}
          </Formik>
        </Modal>
      </>
  )

}