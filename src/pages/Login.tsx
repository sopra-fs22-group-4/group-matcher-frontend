import {ArrowBackIcon, EmailIcon, Icon} from '@chakra-ui/icons'
import {
    Button,
    ButtonGroup,
    Center, Container,
    FormControl,
    FormErrorMessage, FormHelperText,
    FormLabel,
    Heading, HStack,
    Input,
    InputGroup,
    InputLeftAddon, InputRightAddon,
    SlideFade, Switch, Text,
    useToast,
    VStack
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps, FormikValues } from 'formik'
import React, {useState} from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import {object, string} from 'yup'
import User from "../models/User";

export default function Login() {
    const {get, post, response} = useFetch()
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const tryLogin = async (values: FormikValues) => {
        await post('/login', values)
        const logged_in_user = new User(response.data)

        if (!response.ok && response.status == 404) {
            toast({ title: 'Email not found - are you registered yet?', description: response.status, status: response.ok ? 'success' : 'error' })
            return
        }
        if (!response.ok && response.status == 401) {
            toast({ title: 'Password wrong - did you forget it?', description: response.status, status: response.ok ? 'success' : 'error' })
            return
        }
        localStorage.setItem('token', logged_in_user.token)
        localStorage.setItem('id', logged_in_user.id)
        toast({ title: 'Logged in', description: response.status, status: response.ok ? 'success' : 'error' })
        navigate('/dashboard')
    }

    const passwordReset = () => {
        return null
    }

    return (
        <VStack spacing={-50}>
            <Center h='80vh'>
                <Formik initialValues={{email: '', password: ''}} onSubmit={(values, { setSubmitting, resetForm }) => {
                    tryLogin(values)
                    resetForm({});
                    setSubmitting(false);
                }}>
                    {(formProps: FormikProps<any>) =>
                        <VStack as={Form} spacing={14} width={800}>
                            <VStack spacing={2} width={600}>
                                <Heading color='blue.700'>Login</Heading>
                                <HStack>
                                    <Text color='blue.700' fontSize="s" align={"center"}>Login to your personal account to view and manage your matchers.</Text>
                                </HStack>
                            </VStack>
                            <HStack spacing={50} width={700}>
                                <Field name='email' children={(fieldProps: FieldProps) =>
                                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                                        <FormLabel color='blue.700' htmlFor='email'><strong>Email address</strong></FormLabel>
                                        <InputGroup>
                                            <Input placeholder='max.muster@email.com' {...fieldProps.field} type='email'/>
                                            <InputRightAddon><Icon as={EmailIcon}/></InputRightAddon>
                                        </InputGroup>
                                    </FormControl>} />
                                <Field name='password' children={(fieldProps: FieldProps) =>
                                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                                        <FormLabel color='blue.700'><strong>Password</strong></FormLabel>
                                        <InputGroup>
                                            <Input placeholder='Password' {...fieldProps.field} minLength={6} maxLength={20} type={show ? 'text' : 'password'}/>
                                            <InputRightAddon width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightAddon>
                                        </InputGroup>
                                    </FormControl>} />
                            </HStack>
                            <HStack spacing={10}>
                                <Button colorScheme='blue' variant='link' fontSize="xs">
                                    Forgot Password?
                                </Button>
                                <Button width={200} colorScheme='blue' isFullWidth={true} type='submit'
                                        disabled={!formProps.values.email || !formProps.values.password || formProps.values.password.length < 6}>Login
                                </Button>
                            </HStack>
                            <HStack spacing={1}>
                                <Text fontSize="s">Don't have an account yet?</Text>
                                <Button colorScheme='blue' width={16} variant='link'
                                        onClick={() => navigate('/registration')}>Register
                                </Button>
                                <Text>now!</Text>
                            </HStack>
                        </VStack>}
                </Formik>
            </Center>
            <p>
                <Button  leftIcon={<ArrowBackIcon/>} marginLeft={-350} colorScheme='blue' width={100}
                         onClick={() => navigate('/')}>Back
                </Button>
            </p>
        </VStack>
    )
}