import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button, Heading, HStack, Stack, Stat, StatHelpText, StatLabel, StatNumber, Tag, TagLabel, Text
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { capitalize } from 'lodash'
import React from 'react'
import { IconType } from 'react-icons'
import { BsCircleFill, BsFillCircleFill } from 'react-icons/bs'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export function SidebarButton(props: { to: string, isEnd?: boolean, icon: IconType }) {
  const targetPath = useResolvedPath(props.to)
  const currentPath = useMatch({ path: targetPath.pathname, end: props.isEnd })
  return <Button as={Link} to={targetPath.pathname} leftIcon={<props.icon fontSize='1.2rem' />}
                 justifyContent='start' w='full' iconSpacing={3} _active={{ bg: 'gray.100' }}
                 isActive={!!currentPath}>{capitalize(props.to) || 'Dashboard'}</Button>
}

export function StatusTag({ status }: { status: string }) {
  const colorSchemes: Record<string, string> = { 'Draft': 'gray', 'Active': 'green', 'Completed': 'purple' }
  return (
      <Tag color={`${colorSchemes[status]}.400`} bg='whiteAlpha.900' size='sm' gap={2}>
        <Icon as={BsCircleFill} boxSize={2} />
        <TagLabel fontWeight={600} textTransform='uppercase'>{status}</TagLabel>
      </Tag>
  )
}

export function MatcherCard({ matcher }: { matcher: MatcherProps }) {
  const colorSchemes: Record<string, string> = { 'Draft': 'orange', 'Active': 'blue', 'Completed': 'purple' }
  return (
      <Button as={Link} to={`/dashboard/matchers/${matcher.id}`} variant='hover' colorScheme={colorSchemes[matcher.status]}>
        <Stack boxSize='full' spacing={8} justify='space-between'>
          <Box>
            <StatusTag status={matcher.status} />
            <Heading whiteSpace='normal' fontSize='3xl'>{matcher.courseName}</Heading>
          </Box>
          <Stack fontWeight={600} spacing={0} justify='end' zIndex={1}>
            <Text>Deadline: {format(parseISO(matcher.dueDate.toString()), 'dd.MM.yyyy')}</Text>
            <Text>Submissions: {matcher.submissionsCount}</Text>
          </Stack>
        </Stack>
        <Icon as={BsFillCircleFill} color={colorSchemes[matcher.status]+'.520'} mixBlendMode='soft-light'
              position='absolute' boxSize='xs' left='35%' top='-5%'/>
      </Button>
  )
}

export function StatItem(props: { label: string, value: any, icon: IconType }) {
  return (
      <Stat maxW='fit-content'>
        <HStack>
          <Icon as={props.icon} color='purple.500' p={0.5} bg='purple.70' rounded='full'/>
          <StatLabel whiteSpace='nowrap'>{props.label}</StatLabel>
        </HStack>
        <StatNumber textTransform='capitalize' fontSize='lg' pl={7} pt={2}>
          {props.value}
        </StatNumber>
      </Stat>
  )
}