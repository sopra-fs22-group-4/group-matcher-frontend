import {
  Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  useDisclosure, useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import { pick } from 'lodash'
import React, { ReactNode } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { useFetch } from 'use-http'
import DeleteForm from './DeleteForm'
import { baseSchema } from './Schemas'

type ModalFormProps = { fields: any, currentValues?: object, url: string, name: string, children: ReactNode, variant?: string }

export default function ModalForm({ fields, currentValues, url, name, children, variant }: ModalFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { put, response } = useFetch(url)
  const toast = useToast()
  const schema = baseSchema.pick(fields)
  const initialValues = currentValues ? pick(currentValues, fields) : schema.getDefaultFromShape()
  const addButtonProps = { leftIcon: <FaPlus fontSize='1.5rem' />, children: 'Add '+name, variant: 'solid' }

  const onSubmit = (values: FormikValues) => put(values).then(data => {
    if (response.ok) {
      toast({ status: 'success', title: `Successfully updated!` })
      variant === 'add' ? window.location.reload() : onClose()
    }
    else toast({ title: data.message, status: 'error' })
  })

  return (
      <>
        {(variant === 'icon')
            ? <IconButton aria-label={'Edit '+name} onClick={onOpen} icon={<AiOutlineEdit />} size='lg' variant='ghost'/>
            : <Button onClick={onOpen} variant='outline' boxShadow='lg' rounded='lg' p={6} children='Edit' colorScheme='green'
                      leftIcon={<AiOutlineEdit fontSize='1.5rem' />} {...(variant === 'add' && addButtonProps)} />}
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
                  <ModalFooter justifyContent={variant !== 'add' ? 'space-between' : 'center'}>
                    {variant !== 'add' && <DeleteForm name={name} url={url} />}
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