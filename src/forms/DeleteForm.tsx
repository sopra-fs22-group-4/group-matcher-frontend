import {
  Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,
  useDisclosure
} from '@chakra-ui/react'
import { lowerCase } from 'lodash'
import React, { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'

export default function DeleteForm({ name, url }: { name: string, url: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { del } = useFetch(url)
  const navigate = useNavigate()

  useEffect(() => () => window.location.reload(), [])

  return (
      <>
        <Button variant='ghost' size='lg' colorScheme='red' onClick={onOpen} leftIcon={<BsTrash />}>
          Delete
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete {name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this {lowerCase(name)}?</Text>
              <Text fontWeight={600}>This action is not reversible!</Text>
            </ModalBody>
            <ModalFooter as={ButtonGroup} justifyContent='center' spacing={4}>
              <Button variant='round' onClick={() => del().then(() => navigate('/dashboard'))}>
                Confirm
              </Button>
              <Button variant='round-outline' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}