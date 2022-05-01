import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, chakra, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup,
  InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, RadioProps, Stack, Text, useStyleConfig, VStack
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, useField } from 'formik'
import { Calendar } from 'primereact/calendar'
import { FileUpload, FileUploadHeaderTemplateOptions } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { ImFileText2 } from 'react-icons/im'
import { MdOutlineClose } from 'react-icons/md'

const ChakraCalendar = chakra(Calendar)
const ChakraFileUpload = chakra(FileUpload)
const ChakraProgressBar = chakra(ProgressBar)

export function DateField({ prefix }: { prefix: string }) {
  const fieldStyle: any = useStyleConfig('Input', { variant: 'outline' })
  return (
      <Field name={prefix+'Date'} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>{prefix} Date</FormLabel>
            <ChakraCalendar {...fieldProps.field} showTime showIcon dateFormat='dd/mm/yy' __css={fieldStyle.field} />
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

function BorderRadio(props: RadioProps) {
  const [_, fieldMeta] = useField('logic')
  return (
        <HStack p={3} rounded='xl' borderWidth={2} boxShadow='lg' borderColor={fieldMeta.value === props.value ? 'blue.500' : 'gray.200'}>
          <Radio {...props} />
        </HStack>
  )
}

export function MatchingLogicField() {
  return (
      <Field name='logic' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <Stack as={RadioGroup} w='fit-content' spacing={5} fontWeight={500} my={8}>
              <BorderRadio {...fieldProps.field} value='MOST_SIMILAR' children='Similar working styles and experience' />
              <BorderRadio {...fieldProps.field} value='LEAST_SIMILAR' children='Similar working styles but different levels of experience' />
            </Stack>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function GroupSizeField() {
  return (
      <Field name='groupSize' children={(fieldProps: FieldProps) =>
          <FormControl as={HStack} isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>Group size:</FormLabel>
            <NumberInput variant='flushed' w='4rem' min={0} max={8} onChange={(value) => fieldProps.form.setFieldValue('groupSize', value)}>
              <NumberInputField {...fieldProps.field} textAlign='center' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>} />
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

export function FileUploader() {
  const header = (options: FileUploadHeaderTemplateOptions) => <ButtonGroup m={2}>{options.chooseButton}</ButtonGroup>
  const empty = () =>
      <VStack flexGrow={1}>
        <Icon boxSize='30%' as={AiOutlineCloudUpload} color='gray.200' />
        <Text color='gray.600'>drag & drop a file here</Text>
      </VStack>
  return <VStack as={ChakraFileUpload} border='2px dashed' borderColor='gray.200' flexDir='column-reverse'
                 justify='center' m={8} url='./upload' chooseLabel='Select file' rounded='3xl'
                 itemTemplate={ItemTemplate} headerTemplate={header} emptyTemplate={empty} />
}

export function StudentsField() {
  return (
      <FieldArray name='students' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <Stack p={2} maxH='10rem' overflow='auto'>
            {fieldArrayProps.form.values.students.map((student: string, index: number) =>
                <Field key={index} name={`students.${index}`} children={(fieldProps: FieldProps) =>
                    <FormControl as={HStack} isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                      <Text textAlign='center' w='1rem'>{index+1}</Text>
                      <InputGroup>
                        <Input {...fieldProps.field} variant='flushed' placeholder='Enter student email' />
                        <InputRightElement>
                          <IconButton icon={<MdOutlineClose />} isRound variant='ghost' aria-label='remove student'
                                      cursor='pointer' onClick={() => fieldArrayProps.remove(index)}/>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>} />)}
            <Button size='sm' py={2} variant='ghost' leftIcon={<BiPlus />} onClick={() => fieldArrayProps.push('')}>Add</Button>
          </Stack>} />
  )
}