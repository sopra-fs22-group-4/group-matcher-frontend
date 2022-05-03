import {
  Button, ListItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, UnorderedList,
  useDisclosure
} from '@chakra-ui/react'
import useLocalStorage from 'use-local-storage'

export default function BetaTestersModal() {
  const [showNotice, setShowNotice] = useLocalStorage('showedNotice', true)
  const { isOpen, onClose } = useDisclosure({ isOpen: showNotice })

  return (
      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hello there, beta tester!</ModalHeader>
          <ModalBody as={Stack}>
            <Text>
              Welcome to our app! Before you start, we have a small request. It would be very helpful for us if
              you can focus in your review more on your experience as a user:
            </Text>
            <UnorderedList pl={4}>
              <ListItem>Was it always clear to you what to do?</ListItem>
              <ListItem>Did you find it easy to navigate the app?</ListItem>
              <ListItem>Any UI glitches or scaling issues? (Please attach screenshots!)</ListItem>
              <ListItem>Any security concerns?</ListItem>
            </UnorderedList>
            <Text>
              Issues related to functionality (like buttons not doing anything, files not uploaded, chart data
              not updating) are generally all known to us and are under development.
            </Text>
            <Text>
              <u>Note</u>: When you register/login, you are using the app as an <b>admin</b>. To use the app
              as a <b>student</b>, first create a matcher with some questions and students, then click "View
              Matching Quiz" and access it using one of the student emails you added before.
            </Text>
          </ModalBody>
          <ModalFooter justifyContent='center'>
            <Button size='sm' py={6} onClick={() => { setShowNotice(false); onClose() }}>
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
