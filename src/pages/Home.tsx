import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, Center, Container, Heading, HStack, IconButton, Stack, Switch, Text, Tooltip, useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const ThemeIcon = useColorModeValue(SunIcon, MoonIcon)
  const context = { message: 'Welcome message from the context' }

  return (
      <Center overflow='hidden' h='100vh'>
        <Container centerContent gap={10}>
          <Heading color='blue.500'>{`This is ${colorMode} mode`}</Heading>
          <HStack>
            <Text>Toggle theme</Text>
            <Switch onChange={toggleColorMode} />
          </HStack>
          <Tooltip label='Toggle Theme'>
            <IconButton variant='outline' icon={<ThemeIcon />} size='lg' aria-label='toggle theme' onClick={toggleColorMode} />
          </Tooltip>
          <ButtonGroup isAttached variant='outline'>
            <Button onClick={() => navigate('/')}>Home</Button>
            <Button onClick={() => navigate('/main')}>Main</Button>
            <Button onClick={() => navigate('/create')}>Create</Button>
          </ButtonGroup>
          <Stack>
            <Button colorScheme='teal'
                    onClick={() => navigate('/login')}>Login
            </Button>
          </Stack>
          <Outlet context={context} />
        </Container>
      </Center>
  )
}
