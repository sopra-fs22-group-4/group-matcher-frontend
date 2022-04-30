import { Icon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { FaRegClipboard } from 'react-icons/fa'
import { FiGrid, FiLogOut, FiSettings } from 'react-icons/fi'
import { Navigate, Outlet } from 'react-router-dom'
import { Provider } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { ReactComponent as BackgroundIllustration } from '../../assets/bg.svg'
import { SidebarButton } from '../../components/Buttons'

export default function Dashboard() {
  const [adminData, setAdminData] = useLocalStorage<AdminData | undefined>('adminData', undefined)

  if (!adminData?.id)
    return <Navigate to='/login' />

  return (
      <Flex h='100vh'>
        <Stack p={12} spacing={12} position='relative' overflow='hidden'>
          <Box>
            <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser} />
            <Heading p={3} fontSize='lg'>Hi, {adminData.name}</Heading>
          </Box>
          <Icon as={BackgroundIllustration} w='max' h='70vh' position='absolute' left='-25%' top='-60%' zIndex={-1} />
          <Stack as={ButtonGroup} spacing={10} variant='ghost' colorScheme='gray' w='12rem' flexGrow={1}>
            <SidebarButton to='' isEnd icon={FiGrid} />
            <SidebarButton to='matchers' icon={FaRegClipboard} />
            <SidebarButton to='profile' isEnd icon={BiUser} />
            <SidebarButton to='settings' isEnd icon={FiSettings} />
          </Stack>
          <Divider borderColor='gray.300' />
          <Button onClick={() => setAdminData(undefined)} variant='ghost' colorScheme='gray' leftIcon={<FiLogOut />}>Logout</Button>
        </Stack>
        <Divider orientation='vertical' borderColor='gray.300' />
        <Provider url={`/api/admins/${adminData.id}`} options={{ data: [], cache: 'no-cache' }}>
          <Outlet context={adminData} />
        </Provider>
      </Flex>
  )
}