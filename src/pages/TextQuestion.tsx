import {ArrowBackIcon, EmailIcon, Icon} from '@chakra-ui/icons'
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading, HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
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
} from 'formik'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import * as Yup from 'yup';
import { object, string } from 'yup'
import React_2 from "framer-motion/dist/framer-motion";
import {ok} from "assert";

export default function TextQuestion(){
    const {post, response} = useFetch()
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    const postQuestion = async (values: FormikValues) => {
        const id = 1
        const questionData = await post('/matcher/'+id+'/question/', values)

        if(!response.ok) {
            toast({title: questionData.message, description: response.status, status:response.ok ? 'success':'error'})
            return
        }
        toast({title: 'Posted Successfully', description: response.status, status: response.ok ? 'success':'error'})
        navigate('/all questions')
    }

    const schema = Object({question: string().required().matches(
            /^.*(?=.{10,200})*$/,
            "The question must contain minimum of 10 and a maximum of 200 characters")})

    return (
        <VStack>
            <Center h='80vh'>
                <Formik initialValues={{question: ''}} validationSchema={schema} onSubmit={postQuestion}>
                    {(formProps: FormikProps<any>) =>
                        <VStack as={Form} spacing={14} width={400}>
                            <VStack spacing={2} width={600}>
                                <Heading color='blue.700'>Question Creator</Heading>
                                <HStack>
                                    <Text color='blue.700' fontSize="s" align={"center"}>Add text question here </Text>
                                </HStack>
                            </VStack>
                            <VStack spacing={8} width={400}>
                                <Field name='description' children={(fieldProps: FieldProps) =>
                                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                                        <FormLabel color='blue.700' htmlFor='text'><strong>Description</strong></FormLabel>
                                        <InputGroup>
                                            <Input placeholder='Enter question here.' {...fieldProps.field} minLength={2} maxLength={200} type='textarea' />
                                            <InputRightAddon><Icon width='1.45rem' as={Icon}/></InputRightAddon>
                                        </InputGroup>
                                        <FormErrorMessage justifyContent='end'>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                                    </FormControl>} />
                            </VStack>
                            <p>
                            <Button colorScheme='blue' width={200} type='submit'
                                    disabled={!formProps.values.description || formProps.values.description < 10}>Post Question
                            </Button>
                            </p>
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