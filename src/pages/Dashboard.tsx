import {Button, Center, VStack} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate()
    return(
        <VStack>
            <Center h='80vh'>
                <h1>This still needs to be implemented so for now this is just an empty page</h1>
            </Center>
            <p>
                <Button  leftIcon={<ArrowBackIcon/>} marginLeft={-350} colorScheme='blue' width={100}
                         onClick={() => navigate('/')}>Back
                </Button>
            </p>
        </VStack>
    )
}