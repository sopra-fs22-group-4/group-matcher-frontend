import { Icon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const bgColors: Array<string> = ['purple', 'blue', 'orange', 'green']

export function MatcherCard({ matcher, colorIndex }: { matcher: MatcherProps, colorIndex: number }) {
  return (
      <Stack p={5} spacing={4} h='3xs' width='sm' rounded='2xl' position='relative' overflow='hidden'
             bg={bgColors[colorIndex % bgColors.length] +'.500'} color='white' boxShadow='hover'>
        <Heading fontSize='3xl'>{matcher.courseName}</Heading>
        <Icon as={BsFillCircleFill} color='#0000000a' position='absolute' boxSize='xs' left='35%' top='-5%' />
        <Stack fontWeight={600} flexGrow={1} spacing={0} justify='end' zIndex={1}>
          <Text>Deadline: {parseISO(matcher.dueDate).toLocaleDateString()}</Text>
          <Text>Submissions: {matcher.submissionsCount}</Text>
        </Stack>
        <ButtonGroup spacing={4}>
          <Button variant='outline' color='white' borderWidth={2} borderColor='white' colorScheme='whiteAlpha'
                  _hover={{ bg: 'whiteAlpha.400'}} py={4} as={Link} to={'matchers/'+matcher.id}>Edit</Button>
          <Button bg='white' color='purple.400' borderColor='transparent' borderWidth={2} py={4}
                  _hover={{ bg: 'purple.50'}}>Pause</Button>
        </ButtonGroup>
      </Stack>
  )
}

export function SubmissionItem({ submission }: { submission: SubmissionProps }) {
  return (
      <HStack>
        <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser} />
        <Stack>
          <Text fontWeight={700}>{submission.name}</Text>
          <Text>{parseISO(submission.submissionTimestamp).toLocaleDateString()}</Text>
        </Stack>
        <Text fontWeight={700}>{submission.courseName}</Text>
      </HStack>
  )
}