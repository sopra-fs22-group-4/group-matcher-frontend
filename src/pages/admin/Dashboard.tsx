import { Icon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Stack } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { FaRegClipboard } from 'react-icons/fa'
import { FiGrid, FiLogOut } from 'react-icons/fi'
import { Navigate, Outlet } from 'react-router-dom'
import { StompSessionProvider } from 'react-stomp-hooks'
import { CachePolicies, Interceptors, Provider } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { LineBackground } from '../../components/Backgrounds'
import { SidebarButton } from '../../components/Buttons'

const interceptors: Interceptors<any> = { response: async ({ response }) => {
  if (response.data) {
    response.data.publishDate = parseISO(response.data.publishDate)
    response.data.dueDate = parseISO(response.data.dueDate)
  }
  return response
}}

export default function Dashboard() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)

  if (!adminData?.id)
    return <Navigate to='/login' />

  return (
      <Flex minH='100vh'>
        <Stack flexGrow={1} maxW='max-content' p={4} spacing={8} position='relative' borderRightWidth={1}>
          <Box>
            <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser} />
            <Heading p={3} fontSize='lg'>Hi, {adminData.name}</Heading>
          </Box>
          <Stack as={ButtonGroup} spacing={6} variant='ghost' minW='12vw' colorScheme='gray' flexGrow={1}>
            <SidebarButton to='' icon={FiGrid} />
            <SidebarButton to='matchers' isEnd={false} icon={FaRegClipboard} />
            <SidebarButton to='profile' icon={BiUser} />
          </Stack>
          <Divider borderColor='gray.300' />
          <Button onClick={() => setAdminData(undefined)} variant='ghost' colorScheme='gray' leftIcon={<FiLogOut />}>Logout</Button>
          <LineBackground boxSize='sm' viewBox='-200 900 1100 1000' />
        </Stack>
        <StompSessionProvider url='/api/live'>
          <Provider url={`/api/admins/${adminData.id}`} options={{ data: [], cache: CachePolicies.NO_CACHE, interceptors }}>
            <Outlet context={adminData} />
          </Provider>
        </StompSessionProvider>
      </Flex>
  )
}