import { Icon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, chakra, Heading, Tab, Text, useTabsContext, VStack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'
import { ReactComponent as CheckmarkIllustration } from '../assets/checkmark.svg'

const ChakraProgressBar = chakra(ProgressBar)

export function StepTab({ index, isLast }: { index: number, isLast: boolean }) {
  const { selectedIndex } = useTabsContext()
  const progress = index < selectedIndex ? 100 : 0
  const selectedStyle = { color: 'whiteAlpha.900', bg: 'blue.500' }
  return (
      <>
        <Tab boxSize={10} bg='gray.200' color='gray.600' aria-checked={index <= selectedIndex}
              _checked={selectedStyle} _selected={selectedStyle}>{isLast ? '✓' : index+1}</Tab>
        {!isLast &&
          <ChakraProgressBar value={selectedIndex === index ? 50 : progress} showValue={false} flexGrow={1} h={2} />}
      </>
  )
}

export function TabNavButtons({ lastIndex }: { lastIndex: number }) {
  const { selectedIndex, setSelectedIndex } = useTabsContext()
  return (
      <ButtonGroup h={12}>
        {selectedIndex !== 0 &&
          <Button variant='round-outline' bg='white' onClick={() => setSelectedIndex(selectedIndex-1)}>
            Previous step
          </Button>}
        <Box flexGrow={1} />
        {selectedIndex !== lastIndex &&
          <Button variant='round' onClick={() => setSelectedIndex(selectedIndex+1)}>
            Next step
          </Button>}
      </ButtonGroup>
  )
}

export function ConfirmForm() {
  const { dirty, isValid, isSubmitting } = useFormikContext()
  return (
      <VStack p={1} spacing={3}>
        <Icon as={CheckmarkIllustration} boxSize='20%'/>
        <Heading fontSize='3xl'>Almost done!</Heading>
        <Text textAlign='center' color='gray.600' w='sm'>
          Please review the information you provided previously and when you are ready, click submit.
        </Text>
        <Button variant='round' type='submit' isDisabled={!dirty || !isValid} isLoading={isSubmitting}>
          Submit
        </Button>
      </VStack>
  )
}