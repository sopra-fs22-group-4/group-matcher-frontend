import React from 'react'
import {Button, Heading, useToast, VStack} from "@chakra-ui/react";
import {useFetch} from "use-http";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {EmailField} from "../../forms/AuthFields";

export default function StudentAccess() {
    const { matcherId } = useParams()
    const { get, response } = useFetch('/matchers/' + matcherId + '/students')
    const navigate = useNavigate()
    const toast = useToast()

    const studentAccess = async (values: FormikValues) =>  {
        const accessResponse = await get(values.email)
        if (response.ok) {
            navigate('/quiz')
        }
        else {
            toast({ title: accessResponse.message, status: 'error' })
        }
    }

    return (
        <VStack h='100vh' justify='center' color='blue.700' spacing={10}>
          <VStack>
            <Heading>Welcome to groupmatcher!</Heading>
            <Heading>In order to gain access please enter your e-mail below!</Heading>
          </VStack>
          <Formik initialValues={{}} onSubmit={studentAccess}>
              {(formProps: FormikProps<any>) =>
                <VStack as={Form} spacing={10}>
                  <EmailField />
                  <Button px={8} py={6} type='submit' isLoading={formProps.isSubmitting}>Access Matcher</Button>
                </VStack>}
          </Formik>
        </VStack>
    )
}
