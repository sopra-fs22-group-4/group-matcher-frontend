import React from 'react'
import {Container, Heading, VStack} from '@chakra-ui/react'
import {Icon} from "@chakra-ui/icons";
import {ReactComponent as CheckmarkIllustration} from "../assets/checkmark.svg";

export default function VerifyConfirmation() {
    return (
        <VStack minH='100vh' minW='fit-content' p={4} spacing={12} position='relative' justify='center'>
            <VStack>
                <Heading>Thank you for registering on group matcher!</Heading>
            </VStack>
            <Container gap={6} w='lg' centerContent bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} p={10}>
                <Icon as={CheckmarkIllustration} boxSize='10rem' />
                <Heading fontSize='lg'>Your account still has to be confirmed.</Heading>
                <Heading fontSize='lg'>Please check your email inbox!</Heading>
            </Container>
        </VStack>
    )
}