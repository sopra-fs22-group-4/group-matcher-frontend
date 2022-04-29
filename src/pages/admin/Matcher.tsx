import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, Center, Flex, Heading, HStack, Spinner, Stack, Stat, StatGroup, StatLabel, StatNumber
} from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import { HiCalendar, HiLightBulb, HiUser } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'

export default function Matcher() {
  const { matcherId } = useParams()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [matcherId])

  if (!matcher)
    return <Center h='100vh'><Spinner /></Center>

  return (
      <Stack flexGrow={1} spacing={10} p={12}>
        <Heading fontSize='3xl'>{matcher?.courseName}</Heading>
        <StatGroup boxShadow='lg' p={5}>
          <Stat>
            <HStack>
              <Icon as={HiUser} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Total Participants</StatLabel>
            </HStack>
            <StatNumber pl={6}>213</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiLightBulb} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Total Questions</StatLabel>
            </HStack>
            <StatNumber pl={6}>14</StatNumber>
          </Stat>
          <Stat>
            <HStack>
              <Icon as={HiCalendar} color='#9D31D0' p={0.5} bg='rgb(157 49 208 / 20%)' rounded='full' />
              <StatLabel>Due Date</StatLabel>
            </HStack>
            <StatNumber pl={6}>{parseISO(matcher.dueDate).toLocaleDateString()}</StatNumber>
          </Stat>
          <Button colorScheme='green' borderColor='#10CD45' color='#10CD45' variant='outline' borderWidth={2}
                  boxShadow='lg' rounded='lg' leftIcon={<MdSend />}>Send Matcher</Button>
        </StatGroup>
        <Flex flexGrow={1}>
          <Stack flexGrow={1}>
            <Heading fontSize='2xl' color='purple.400'>Matcher Details</Heading>
            <ButtonGroup>
              <Button as={Link} to='create-question' colorScheme='blue'>Create new question</Button>
            </ButtonGroup>
          </Stack>
          <Stack flexGrow={1}>
            <Heading fontSize='2xl' color='purple.400'>Participants</Heading>
          </Stack>
        </Flex>
      </Stack>
  )
}