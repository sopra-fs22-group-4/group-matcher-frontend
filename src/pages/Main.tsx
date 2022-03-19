import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box, Button, Collapse, SlideFade, Text, useColorModeValue, useDisclosure, useToast, VStack
} from '@chakra-ui/react'
import React from 'react'
import { HiOutlineBell } from 'react-icons/hi'
import { useOutletContext } from 'react-router-dom'

export default function Main() {
  const { isOpen, onToggle } = useDisclosure()
  const { message }: AppContext = useOutletContext()
  const toast = useToast()
  const bgColor = useColorModeValue('#B990ED', '#551d9b')
  const showMessage = () => toast({ title: message, duration: 3000, isClosable: true })

  return (
    <SlideFade in offsetY='20px'>
      <VStack>
        <Text>Main</Text>
        <Button colorScheme='blue' leftIcon={<HiOutlineBell />} onClick={showMessage}>Show Message</Button>
        <Button colorScheme='purple' leftIcon={<ChevronDownIcon />} onClick={onToggle}>{isOpen ? 'Close' : 'Open'}</Button>
        <Collapse in={isOpen} animateOpacity>
          <Box bg={bgColor} p={5}>
            {message}
          </Box>
        </Collapse>
      </VStack>
    </SlideFade>
  )
}
