import { Icon } from '@chakra-ui/icons'
import { Center, Container, Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { ReactComponent as BackgroundIllustration } from '../assets/bg.svg'
import { ReactComponent as CheckmarkIllustration } from '../assets/checkmark.svg'

export default function Verify() {
  const { adminId } = useParams()
  const { put } = useFetch(`/api/admins/${adminId}/verify`)
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    put().then(fetchedData => {
      setAdminData(fetchedData)
      setTimeout(() => navigate('/dashboard'), 5000)
    }).catch(fetchedData => toast({ title: fetchedData.message, status: 'error' }))
  }, [])

  if (!adminData?.id)
    return <Center h='100vh'><Spinner /></Center>

  return (
      <VStack h='100vh' justify='center' position='relative' overflow='hidden' spacing={12}>
        <Icon as={BackgroundIllustration} boxSize='max-content' position='absolute' transform='scaleY(-1)' right='-80%' top='-25%' zIndex={-1} />
        <VStack>
          <Heading>Thank you, {adminData.name}!</Heading>
          <Text textAlign='center' w='md' color='gray.600'>Your account has been successfully created.</Text>
        </VStack>
        <Container gap={6} w='lg' centerContent bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} p={10}>
          <Icon as={CheckmarkIllustration} boxSize='10rem' />
          <Heading fontSize='lg'>Your account is ready for you.</Heading>
          <Text>You will now be redirected to your dashboard...</Text>
        </Container>
      </VStack>
  )
}
