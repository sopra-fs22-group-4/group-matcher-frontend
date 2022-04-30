import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

export default function Redirect() {
  const { path } = useParams()
  if (!path)
    return <Center h='100vh'><Spinner /></Center>
  return <Navigate to={'/'+path} />
}