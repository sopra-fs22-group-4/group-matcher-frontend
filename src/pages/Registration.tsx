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
    SlideFade, Text,
    useToast,
    VStack
} from '@chakra-ui/react'
import {
    Field,
    FieldProps,
    Form,
    Formik,
    FormikProps,
    FormikValues,
    useFormik,
    useFormikContext,
    yupToFormErrors
} from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import * as Yup from 'yup';
import { object, string } from 'yup'

export default function Registration() {
    const {get, post, response} = useFetch()
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const register = async (values: FormikValues) => {
        await post('/register', values)
        if (!response.ok && response.status == 409) {
            toast({ title: 'Email already taken - are you already registered?', description: response.status, status: response.ok ? 'success' : 'error' })
            return
        }
        navigate('/dashboard')
    }


    const schema = object({ email: string().required().matches(/^.*((?=.*[@]){1}).*$/, "Not a valid email"),
        password: string().required().matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>?]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 6 characters, one uppercase, one number and one special case character"),
        repeatPassword: string().required().oneOf([Yup.ref('password'), null], "Passwords don't match")
    })

    return (
        <VStack>
            <Center h='80vh'>
                <Formik initialValues={{email: '', password: '', repeatPassword:''}} validationSchema={schema} onSubmit={register}>
                    {(formProps: FormikProps<any>) =>
                        <VStack as={Form} spacing={14} width={400}>
                            <VStack spacing={2} width={600}>
                                <Heading color='blue.700'>Registration</Heading>
                                <HStack>
                                    <Text color='blue.700' fontSize="s" align={"center"}>Register in order to gain full access to all features of GroupMatcher.</Text>
                                </HStack>
                            </VStack>
                            <VStack spacing={8} width={400}>
                                <Field name='email' children={(fieldProps: FieldProps) =>
                                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                                        <FormLabel color='blue.700' htmlFor='email'><strong>Email address</strong></FormLabel>
                                        <InputGroup>
                                            <Input placeholder='max.muster@email.com' {...fieldProps.field} type='email'/>
                                            <InputRightAddon><Icon width='1.45rem' as={EmailIcon}/></InputRightAddon>
                                        </InputGroup>
                                        <FormErrorMessage justifyContent='end'>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
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
                                        <FormErrorMessage justifyContent='end'>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                                    </FormControl>} />
                                <Field name='repeatPassword' children={(fieldProps: FieldProps) =>
                                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                                        <FormLabel color='blue.700'><strong>Repeat Password</strong></FormLabel>
                                        <InputGroup>
                                            <Input placeholder='Repeat Password' {...fieldProps.field} minLength={6} maxLength={20} type={show ? 'text' : 'password'}/>
                                            <InputRightAddon width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightAddon>
                                        </InputGroup>
                                        <FormErrorMessage justifyContent='end'>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                                    </FormControl>} />
                            </VStack>
                            <Button colorScheme='blue' width={200} type='submit'
                                    disabled={!formProps.values.email || !formProps.values.password ||
                                    !formProps.values.repeatPassword || formProps.values.password.length < 6}>Register
                            </Button>
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