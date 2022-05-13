import {Button, Flex, Heading, HStack, useToast, VStack} from "@chakra-ui/react";
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import React from "react";
import useLocalStorage from "use-local-storage";
import {Icon} from "@chakra-ui/icons";
import {CgProfile} from "react-icons/cg";
import {EmailField, NameField, PasswordField} from "../../forms/AuthFields";
import {useFetch} from "use-http";
import {useNavigate} from "react-router";
import {object, ref, string} from "yup";
import {AiOutlineUser} from "react-icons/ai";

export default function Profile() {

    const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
    const initialValues = {name: adminData?.name, email: adminData?.email, password: "", repeatPassword: ""}
    const { put, response } = useFetch('/profile')
    const toast = useToast()
    const navigate = useNavigate()

    const editProfile = async (values: FormikValues) => {
        const responseData = await put(values)
        if (response.ok) {
            setAdminData(responseData)
            navigate('/dashboard/profile')
            window.location.reload()
        }
        else {
            toast({ title: responseData.message, status: 'error' })
        }
    }

    return (
        <VStack flexGrow={1} p={12} spacing={5}>
          <HStack>
            <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={CgProfile} />
            <Heading>{adminData?.name}</Heading>
          </HStack>
          <Formik initialValues={initialValues} onSubmit={editProfile}>
            {(formProps: FormikProps<any>)  =>
            <VStack as={Form} spacing={8}>
              <Flex flexDirection={"column"} gap={5} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} px={10} py={6}>
                <NameField icon={AiOutlineUser}/>
                <EmailField />
                <PasswordField />
                <PasswordField repeat />
                <Button type='submit' isLoading={formProps.isSubmitting}>Edit</Button>
                <Button variant='outline' bg='white' type='reset'>Cancel</Button>
              </Flex>
            </VStack>}
          </Formik>
        </VStack>
    )
}