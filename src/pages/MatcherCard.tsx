import {Box, Badge, Button, Text, useToast, HStack} from "@chakra-ui/react";
import { useState} from "react";
import React, {FC} from "react";
import { useFetch } from 'use-http'

interface adminProps {
    id: number,
}

interface dataInterface{
    title:string,
    deadline: string,
    submissions: number,
}


const MatcherCard: FC<adminProps>=props=> {

    const [matcherData, setMatcherData] = useState<dataInterface[]>([])

    const adminId = props.id;

    const responseData = useFetch('/matcher/'+adminId, {}, []).data
    setMatcherData(responseData);

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