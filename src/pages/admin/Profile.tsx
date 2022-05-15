import { Icon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'
import { EmailField, NameField, PasswordField } from '../../forms/AuthFields'

export default function Profile() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
  const initialValues = { name: adminData?.name, email: adminData?.email, password: '', repeatPassword: '' }
  const { put, response } = useFetch('/profile')
  const toast = useToast()

  const editProfile = async (values: FormikValues) => {
    const responseData = await put(values)
    if (response.ok) {
      setAdminData(responseData)
      toast({ title: 'Profile updated successfully!', status: 'success' })
    } else
      toast({ title: responseData.message, status: 'error' })
  }

  return (
      <VStack flexGrow={1} p={12} spacing={5}>
        <HStack>
          <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser}/>
          <Heading>{adminData?.name}</Heading>
        </HStack>
        <Formik initialValues={initialValues} onSubmit={editProfile}>
          {(formProps: FormikProps<any>) =>
              <VStack as={Form} spacing={8}>
                <Stack gap={5} minW='25vw' boxShadow='lg' rounded='3xl' borderWidth={1} px={10} py={6}>
                  <NameField icon={AiOutlineUser}/>
                  <EmailField/>
                  <PasswordField/>
                  <PasswordField repeat/>
                  <Button variant='round' type='submit' isLoading={formProps.isSubmitting}>Edit</Button>
                  <Button variant='round-outline' type='reset'>Cancel</Button>
                </Stack>
              </VStack>}
        </Formik>
      </VStack>
  )
}