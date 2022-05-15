import { Icon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import { capitalize } from 'lodash'
import React from 'react'
import { IconType } from 'react-icons'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export function SidebarButton(props: { to: string, isEnd?: boolean, icon: IconType }) {
  const targetPath = useResolvedPath(props.to)
  const currentPath = useMatch({ path: targetPath.pathname, end: props.isEnd })
  return <Button as={Link} to={targetPath.pathname} leftIcon={<props.icon fontSize='1.2rem' />}
                 justifyContent='start' iconSpacing={3} _active={{ bg: 'gray.100' }} isActive={!!currentPath}
                 isFullWidth>{capitalize(props.to) || 'Dashboard'}</Button>
}

export function MatcherCard({ matcher, colorScheme }: { matcher: MatcherProps, colorScheme: string }) {
  return (
      <Button as={Link} to={`/dashboard/matchers/${matcher.id}`} variant='hover' colorScheme={colorScheme}>
        <Stack boxSize='full' spacing={8} justify='space-between'>
          <Heading whiteSpace='normal' fontSize='3xl'>{matcher.courseName}</Heading>
          <Stack fontWeight={600} spacing={0} justify='end' zIndex={1}>
            <Text>Deadline: {parseISO(matcher.dueDate).toLocaleDateString()}</Text>
            <Text>Submissions: {matcher.submissionsCount}</Text>
          </Stack>
        </Stack>
        <Icon as={BsFillCircleFill} color='#0000000a' position='absolute' boxSize='xs' left='35%' top='-5%'/>
      </Button>
  )
}

export function StatIcon(props: { icon: IconType }) {
  return <Icon as={props.icon} color='purple.500' p={0.5} bg='purple.70' rounded='full'/>
}

export function StatItem(props: { label: string, value: any, icon: IconType }) {
  return (
      <Stat>
        <HStack>
          <StatIcon icon={props.icon}/>
          <StatLabel>{props.label}</StatLabel>
        </HStack>
        <StatNumber textTransform='capitalize' fontSize='lg' pl={6} pt={2}>
          {props.value}
        </StatNumber>
      </Stat>
  )
}

export function SubmissionItem({ submission }: { submission: SubmissionProps }) {
  return (
      <HStack fontSize='sm'>
        <Icon boxSize='3rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser}/>
        <Stack spacing={0} flexGrow={1}>
          <Text fontWeight={700}>{submission.name}</Text>
          <Text>{parseISO(submission.submissionTimestamp).toLocaleDateString()}</Text>
        </Stack>
        <Text fontWeight={700}>{submission.courseName}</Text>
      </HStack>
  )
}