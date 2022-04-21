import { Box, Button, ButtonGroup, chakra, Tab, useTabsContext } from '@chakra-ui/react'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'

const ChakraProgressBar = chakra(ProgressBar)

export function CircleTab({ index }: { index: number }) {
  const { selectedIndex } = useTabsContext()
  return <Tab boxSize={10} color={index <= selectedIndex ? 'whiteAlpha.900' : 'gray.600'}
              bg={index <= selectedIndex ? 'purple.500' : 'gray.200'} _selected={{}}>{index+1}</Tab>
}

export function TabProgress({ index }: { index: number }) {
  const { selectedIndex } = useTabsContext()
  const progressValue = index < selectedIndex ? 100 : (selectedIndex === index ? 50 : 0)
  return <ChakraProgressBar value={progressValue} showValue={false} flexGrow={1} h={2} />
}

export function TabNavButtons({ lastIndex }: { lastIndex: number }) {
  const { selectedIndex, setSelectedIndex } = useTabsContext()
  return (
      <ButtonGroup h={12}>
        {selectedIndex !== 0 && <Button variant='outline' onClick={() => setSelectedIndex(selectedIndex-1)}>Previous step</Button>}
        <Box flexGrow={1} />
        {selectedIndex !== lastIndex && <Button onClick={() => setSelectedIndex(selectedIndex+1)}>Next step</Button>}
      </ButtonGroup>
  )
}