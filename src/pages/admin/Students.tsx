import { Box, Button, Center, Heading, HStack, Spinner, Stack } from '@chakra-ui/react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from 'use-http'
import { EmailField, NameField } from '../../forms/AuthFields'
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
          <Column field='name' header='Name' />
          <Column field='email' header='Email' />
          <Column field='submissionTimestamp' header='Submitted At' />
          <Column style={{ paddingInline: 0 }} body={(student) =>
              <ModalForm fields={['name', 'email']} currentValues={student} url={`/students/${student.id}`}
                         name='Student' variant='icon' allowDelete>
                <Stack spacing={6}>
                  <NameField icon={AiOutlineUser} />
                  <EmailField />
                </Stack>
              </ModalForm>} />
        </DataTable>
      </Stack>
  )
}
