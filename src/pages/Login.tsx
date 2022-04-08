import {ArrowBackIcon, EmailIcon, Icon} from '@chakra-ui/icons'
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading, HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'

export default function Login() {
    const {post, response} = useFetch()
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const tryLogin = async (values: FormikValues) => {
        const adminData = await post('/login', values)

        if (!response.ok) {
            toast({ title: adminData.message, description: response.status, status: response.ok ? 'success' : 'error' })
            return
        }

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