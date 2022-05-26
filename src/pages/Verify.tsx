import { Icon } from '@chakra-ui/icons'
import { Center, Container, Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { ReactComponent as CheckmarkIllustration } from '../assets/checkmark.svg'
import { LineBackground } from '../components/Backgrounds'

export default function Verify() {
  const { adminId } = useParams()
  const { put, response } = useFetch(`/api/admins/${adminId}/verify`)
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    put().then(data => {
      if (response.ok) {
        setAdminData(data)
        const redirectURL = data?.hasPassword ? '/dashboard' : `/reset/${adminId}`
        setTimeout(() => navigate(redirectURL), 3000)
      } else toast({ title: data.message, status: 'error' })
    })
  }, [])

  if (!adminData?.id)
    return <Center h='100vh'><Spinner /></Center>

  return (
      <VStack minH='100vh' minW='fit-content' p={4} spacing={12} position='relative' justify='center'>
        <VStack>
          <Heading>Thank you, {adminData.name}!</Heading>
          <Text textAlign='center' w='md' color='gray.600'>Your account has been successfully created.</Text>
        </VStack>
        <Container gap={6} w='lg' centerContent bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} p={10}>
          <Icon as={CheckmarkIllustration} boxSize='10rem' />
          <Heading fontSize='lg'>Your account is ready for you.</Heading>
          <Spinner />
          <Text>You will now be redirected to your dashboard...</Text>
        </Container>
        <LineBackground transform='scaleY(-1)' viewBox='-1400 0 1500 500' />
      </VStack>
  )
}
