import { Icon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Container, Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { LineBackground } from '../components/Backgrounds'

export default function Home() {

  return (
      <Stack minH='100vh' minW='fit-content' p={7} spacing={16} position='relative'>
        <Flex align='end' justify='space-between'>
          <Flex align='end' gap={2} flexGrow={1}>
            <Stack align='end' spacing={-2} fontSize='xl' color='blue.500'>
              <Icon as={GoPrimitiveDot} />
              <HStack spacing={-2}>
                <Icon as={GoPrimitiveDot} />
                <Icon as={GoPrimitiveDot} />
              </HStack>
              <HStack spacing={-2}>
                <Icon as={GoPrimitiveDot} />
                <Icon as={GoPrimitiveDot} />
                <Icon as={GoPrimitiveDot} />
              </HStack>
            </Stack>
            <Heading fontSize='5xl' bg='white'>groupmatcher</Heading>
          </Flex>
          <ButtonGroup>
            <Button variant='round-outline' as={Link} to='login'>Login</Button>
            <Button variant='round' as={Link} to='register'>Register</Button>
          </ButtonGroup>
        </Flex>
        <VStack minH='50vh' justify='space-evenly'>
          <Container centerContent textAlign='center' color='blue.500'>
            <Text fontSize='sm' letterSpacing='0.2rem' bg='white'>WE MATCH YOUR GROUPS</Text>
            <Heading fontSize='5xl' bg='white'>Building teams has never been easier.</Heading>
            <Text bg='white' color='gray.600'>
              Optimize your group work and enhance your productivity with a personalized data science based team building tool.
            </Text>
          </Container>
          <Button variant='round' minW='xs' as={Link} to='login'>Create your matcher</Button>
        </VStack>
        <LineBackground transform='scaleX(-1) rotate(90deg)' />
      </Stack>
  )
}
