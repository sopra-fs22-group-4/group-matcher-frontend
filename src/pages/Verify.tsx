import { Center, Spinner, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'

export default function Verify() {
  const { adminId } = useParams()
  const { put } = useFetch(`/admins/${adminId}/verify`)
  const [adminData, setAdminData] = useLocalStorage<AdminData | undefined>('adminData', undefined)
  const toast = useToast()

  useEffect(() => {
    put().then(fetchedData => setAdminData(fetchedData))
        .catch(fetchedData => toast({ title: fetchedData.message, status: 'error' }))
  }, [])

  if (!adminData?.id)
    return <Center h='100vh'><Spinner /></Center>

  return <Navigate to='/dashboard' />
}
