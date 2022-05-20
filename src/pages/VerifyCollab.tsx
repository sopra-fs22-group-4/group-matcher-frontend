import React from 'react'
import {Button, Heading, HStack, Text, useToast, VStack} from "@chakra-ui/react";
import {Form, Formik, FormikProps, FormikValues} from "formik";
import {Icon} from "@chakra-ui/icons";
import {ReactComponent as WindowIllustration} from "../assets/window.svg";
import {PasswordField} from "../forms/AuthFields";
import {LineBackground} from "../components/Backgrounds";
import {baseSchema} from "../forms/Schemas";
import useLocalStorage from "use-local-storage";
import {useFetch} from "use-http";
import {useNavigate, useParams} from "react-router-dom";

export default function VerifyCollab() {
    const { adminId } = useParams()
    const navigate = useNavigate()
    const schema = baseSchema.pick(['password', 'repeatPassword'])
    const { put, response } = useFetch(`/api/admins/${adminId}/profile`)
    const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
    const toast = useToast()

    const verifyCollab = async (values: FormikValues) => {
        setAdminData(undefined)
        const fetchedData = await put(values)
        setAdminData(fetchedData)
        response.ok ? navigate(`/verify/${adminId}`) : toast({ title: fetchedData.message, status: 'error' })
    }

    return (
        <VStack minH='100vh' minW='fit-content' p={10} spacing={8}>
            <VStack>
                <Heading>Hi! You are almost able to access group matcher!</Heading>
                <Text color='gray.600' textAlign='center' lineHeight={1.5} w='lg'>
                    In order to gain full access to your account, we need you to complete your registration by providing a password.
                </Text>
            </VStack>
            <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={verifyCollab}>
                {(formProps: FormikProps<any>) =>
                    <VStack as={Form} spacing={6} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} py={8} px={16}>
                        <Icon as={WindowIllustration} boxSize='8rem' />
                        <HStack pb={2}>
                            <PasswordField />
                            <PasswordField repeat />
                        </HStack>
                        <Button variant='round' type='submit' isLoading={formProps.isSubmitting}>Finish Registration</Button>
                    </VStack>}
            </Formik>
            <LineBackground transform='scaleY(-1)' viewBox='-1400 0 1500 500' />
        </VStack>
    )
}