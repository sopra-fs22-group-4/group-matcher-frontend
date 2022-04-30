import { Icon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const bgColors: Array<string> = ['purple', 'blue', 'orange', 'green']

export function MatcherCard({ matcher, colorIndex, path }: { matcher: MatcherProps, colorIndex: number, path?: string }) {
  const bgColor = bgColors[colorIndex % bgColors.length]
  return (
      <Button as={Link} to={(path || '/') + matcher.id} p={5} minH='full' h='fit-content' w='xs' rounded='2xl' position='relative' overflow='hidden'
             bg={bgColor+'.500'} color='white' boxShadow='hover' _hover={{ transform: 'translateY(-0.5rem)' }} _active={{ bg: bgColor+'.600' }}>
        <Stack boxSize='full' spacing={8} justify='space-between'>
          <Heading whiteSpace='normal' fontSize='3xl'>{matcher.courseName}</Heading>
          <Stack fontWeight={600} spacing={0} justify='end' zIndex={1}>
            <Text>Deadline: {parseISO(matcher.dueDate).toLocaleDateString()}</Text>
            <Text>Submissions: {matcher.submissionsCount}</Text>
          </Stack>
        </Stack>
        <Icon as={BsFillCircleFill} color='#0000000a' position='absolute' boxSize='xs' left='35%' top='-5%' />
      </Button>
  )
}

export function SubmissionItem({ submission }: { submission: SubmissionProps }) {
  return (
      <HStack fontSize='sm'>
        <Icon boxSize='3rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser} />
        <Stack spacing={0} flexGrow={1}>
          <Text fontWeight={700}>{submission.name}</Text>
          <Text>{parseISO(submission.submissionTimestamp).toLocaleDateString()}</Text>
        </Stack>
        <Text fontWeight={700}>{submission.courseName}</Text>
      </HStack>
  )
}

