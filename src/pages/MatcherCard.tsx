import {Box, Badge, Button, Text, useToast, HStack} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import React, {FC} from "react";
import { useFetch } from 'use-http'
import {useNavigate} from "react-router-dom";

interface adminProps {
    id: number,
}

interface dummyInterface{
    title:string,
    deadline: string,
    submissions: number,
}


const MatcherCard: FC<adminProps>=props=> {

    const [matcherData, setMatcherData] = useState<dummyInterface[]>([])
    const navigate = useNavigate();
    const { get, response } = useFetch();
    const toast = useToast();

    const adminId = props.id;


    useEffect(() => {
        const fetchMatcherData = async () => {
            const matcherData = await get("/matcher/"+adminId)
            response.ok ? navigate('/dashboard') : toast({
                status: 'error',
                description: response.status,
            })

            setMatcherData(matcherData);
        }

        fetchMatcherData();
    }, [])

    return (
        <HStack>
            {
                    matcherData.map((data)=>(

                    <Box h='200px' width='sm' rounded='lg' overflow='hidden' boxShadow='sm' color='white' background='blue.500' p={5}>

                        <Box p={5}>
                            <Badge bg={'white'} color={'blue.500'} variant = 'solid' rounded = 'full' px={2}> {data.title} </Badge>
                        </Box>

                        <Box bg={'whiteAlpha.50'}>
                            <Text>
                                Deadline: {data.deadline} &nbsp;
                                Submissions: {data.submissions}
                            </Text>
                        </Box>
                        <br></br>

                        <Box color='blue.500'>
                            <Button> Edit  </Button>
                            <Button> Pause </Button>
                        </Box>
                    </Box>
                ))
            }
        </HStack>
    )

}

export default MatcherCard;