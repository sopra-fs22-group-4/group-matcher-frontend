import { Button, Heading, HStack, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {GoPrimitiveDot} from "react-icons/go"
import {Icon} from "@chakra-ui/icons";

export default function Home() {

  return (
      <VStack h='100vh' justify='center' spacing={10}>
        <HStack marginRight={'40vw'}>
          <VStack spacing={-5}>
            <HStack spacing={-5}>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"white"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"white"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"purple.700"}/>
            </HStack>
            <HStack spacing={-5}>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"white"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"blue.800"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"purple.700"}/>
            </HStack>
            <HStack spacing={-5}>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"blue"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"blue.800"}/>
              <Icon fontSize={"5xl"} as={GoPrimitiveDot} color={"purple.700"}/>
            </HStack>
          </VStack>
            <Heading color="black" fontSize={"5xl"}>group</Heading>
            <Heading color="blue.500" fontSize={"5xl"}>matcher</Heading>
        </HStack>
        <VStack spacing={3}>
          <Text color="blue.600" fontSize="md" fontWeight="bold">WE MATCH YOUR GROUPS</Text>
          <VStack spacing={-3}>
            <Heading color="blue.900" fontSize="5xl" >Building teams has never</Heading>
            <Heading color="blue.900" fontSize="5xl" >been easier.</Heading>
          </VStack>
          <VStack spacing={0}>
            <Text color="blue.600">Optimize your group work and enhance your productivity with a personalized data</Text>
            <Text color="blue.600">science based team building tool.</Text>
          </VStack>
        </VStack>
          <Button width={'10vw'} colorScheme={"blue"} as={Link} to='login'>Login</Button>
          <Button width={'10vw'} colorScheme={"blue"} as={Link} to='register' variant='outline'>Register</Button>
      </VStack>
  )
}
