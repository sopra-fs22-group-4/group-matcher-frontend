import { Icon } from '@chakra-ui/icons'
import {
  ButtonGroup, chakra, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Stack, Text, useStyleConfig, VStack
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import { Calendar } from 'primereact/calendar'
import { FileUpload, FileUploadHeaderTemplateOptions } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai'
import { ImFileText2 } from 'react-icons/im'

const ChakraCalendar = chakra(Calendar)
const ChakraFileUpload = chakra(FileUpload)
const ChakraProgressBar = chakra(ProgressBar)

export function DateField({ prefix }: { prefix: string }) {
  const fieldStyle: any = useStyleConfig('Input', { variant: 'outline' })
  return (
      <Field name={prefix+'Date'} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>{prefix} Date</FormLabel>
            <ChakraCalendar {...fieldProps.field} showTime showIcon dateFormat='dd/mm/yy, at' __css={fieldStyle.field} />
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

function ItemTemplate(file: { name: string }) {
  return (
      <HStack fontSize='sm' spacing={4}>
        <Icon boxSize='4rem' opacity={0.1} as={ImFileText2} />
        <Stack w='xs' flexGrow={1}>
          <Text textAlign='start' fontWeight={600}>{file.name}</Text>
          <ChakraProgressBar value={0} />
          <HStack justify='space-between'>
            <Text>Detected 0 emails.</Text>
            <Text fontWeight={600} color='purple.500'>Uploading... 70%</Text>
          </HStack>
        </Stack>
        <IconButton aria-label='remove file' variant='ghost' px={0} icon={<AiOutlineDelete />} />
      </HStack>
  )
}

export function ParticipantsField() {
  const header = (options: FileUploadHeaderTemplateOptions) => <ButtonGroup m={2}>{options.chooseButton}</ButtonGroup>
  const empty = () =>
      <VStack>
        <Icon boxSize='6rem' as={AiOutlineCloudUpload} color='gray.200' />
        <Text color='gray.600'>Drag and drop a file here or</Text>
      </VStack>
  return <VStack as={ChakraFileUpload} border='2px dashed' borderColor='gray.200' flexDir='column-reverse' rounded='3xl'
                 h='2xs' justify='center' m={8} url='./upload' chooseLabel='Select file'
                 itemTemplate={ItemTemplate} headerTemplate={header} emptyTemplate={empty} />
}