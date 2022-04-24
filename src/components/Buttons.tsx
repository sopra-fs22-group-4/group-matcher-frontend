import { Icon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'
import { MdAddCircleOutline } from 'react-icons/md'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export function AddFormButton() {
  return <Button boxSize='3xs' rounded='2xl' variant='outline' border='2px dashed' borderColor='#999999'
                 iconSpacing={0} leftIcon={<Icon as={MdAddCircleOutline} fontSize='150%' color='#999999' m={2}/>}
                 flexDir='column' color='purple.400' as={Link} to='create-matcher'>Add form</Button>
}

export function SidebarButton(props: { to: string, icon: IconType }) {
  const targetPath = useResolvedPath(props.to)
  const currentPath = useMatch({ path: targetPath.pathname, end: true })
  return <Button as={Link} to={targetPath.pathname} leftIcon={<props.icon fontSize='120%'/>} justifyContent='start' iconSpacing={3}
                 isActive={!!currentPath} textTransform='capitalize' isFullWidth
                 _active={{ bg: 'gray.100' }}>{props.to || 'Dashboard'}</Button>
}