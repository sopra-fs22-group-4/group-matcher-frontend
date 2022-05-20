import { Box, Button, Center, Heading, HStack, IconButton, Spinner, Stack } from '@chakra-ui/react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { FileUploader } from '../../forms/MatcherFields'
import ModalForm from '../../forms/ModalForm'

export default function Students() {
  const { matcherId } = useParams()
  const { data: matcher } = useFetch<MatcherProps>(`/matchers/${matcherId}`, [matcherId])

  if (!matcher?.id)
    return <Center flexGrow={1}><Spinner /></Center>

  return (
      <Stack flexGrow={1} spacing={8} p={10}>
        <HStack justify='space-between'>
          <Box>
            <Button as={Link} to='..' variant='ghost' color='purple.400' leftIcon={<FaRegArrowAltCircleLeft />}>
              {matcher.courseName}
            </Button>
            <Heading fontSize='3xl' pl={8}>Students</Heading>
          </Box>
          <ModalForm fields={['students']} name='Students' url={`/matchers/${matcherId}`} variant='add'>
            <FileUploader />
          </ModalForm>
        </HStack>
        <DataTable stripedRows value={matcher.students} emptyMessage='No students found.'>
          <Column header='Name' field='name' />
          <Column header='Email' field='email' />
          <Column field='submissionTimestamp' header='Submission Date' />
          <Column style={{ paddingInline: 0 }} body={(_student) =>
              <IconButton icon={<AiOutlineEdit fontSize='1.5rem' />} variant='ghost' aria-label='edit student' />} />
        </DataTable>
      </Stack>
  )
}
