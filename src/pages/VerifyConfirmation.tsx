import React from 'react'
import {Container, Heading, VStack, Text} from '@chakra-ui/react'
import {Icon} from "@chakra-ui/icons";
import {ReactComponent as CheckmarkIllustration} from "../assets/checkmark.svg";

export default function VerifyConfirmation() {
    return (
        <VStack minH='100vh' minW='fit-content' p={4} spacing={12} position='relative' justify='center'>
            <VStack>
                <Heading>Thank you for registering on group matcher!</Heading>
                <Text textAlign='center' w='md' color='gray.600'>Your account has been successfully created.</Text>
            </VStack>
            <Container gap={6} w='lg' centerContent bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} p={10}>
                <Icon as={CheckmarkIllustration} boxSize='10rem' />
                <Heading fontSize='lg'>Before you can proceed, please verify your email.</Heading>
            </Container>
        </VStack>
    )
}