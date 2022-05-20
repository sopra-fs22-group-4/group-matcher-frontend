import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, Center, chakra, FormControl, FormErrorMessage, FormLabel, Heading, HStack, IconButton, Input,
  RadioProps, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, useBoolean, useRadio, useRadioGroup,
  useStyleConfig, VStack
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps } from 'formik'
import getEmails from 'get-emails'
import { Calendar } from 'primereact/calendar'
import { FileUpload, FileUploadHeaderTemplateOptions } from 'primereact/fileupload'
import React, { ComponentProps } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { ImFileText2 } from 'react-icons/im'
import { MdOutlineClose } from 'react-icons/md'
import { collaboratorSchema } from './Schemas'

const ChakraCalendar = chakra(Calendar)
const ChakraFileUpload = chakra(FileUpload)

export function DateTimePicker(props: ComponentProps<any>) {
  const fieldStyle: any = useStyleConfig('Input', { variant: 'outline' })
  const [isVisible, { toggle }] = useBoolean()
  return <ChakraCalendar showTime showIcon dateFormat='dd/mm/yy' autoZIndex={false} {...props}
                          __css={fieldStyle.field} visible={isVisible} onVisibleChange={toggle} onBlur={toggle} />
}

export function DateField({ prefix }: { prefix: string }) {
  return (
      <Field name={prefix+'Date'} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>{prefix} Date</FormLabel>
            <DateTimePicker {...fieldProps.field} />
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function StrategyOption(props: RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  return (
      <Button as='label' variant='card' {...getCheckboxProps()}>
        <input {...getInputProps()} />
        <Heading fontSize='xl'>{props.value}</Heading>
        <Text fontSize='xs' fontWeight={400}>
          Some explanation what does this strategy mean and breakdown of question category strategies
        </Text>
      </Button>
  )
}

export function MatchingLogicField() {
  const { getRootProps, getRadioProps } = useRadioGroup({ name: 'matchingStrategy' })
  return (
      <Field name='matchingStrategy' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <Stack my={6} spacing={4} {...getRootProps(fieldProps.field)}>
              <StrategyOption {...getRadioProps({ value: 'Most Similar' })} />
              <StrategyOption {...getRadioProps({ value: 'Balanced Skills' })} />
            </Stack>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function GroupSizeField() {
  return (
      <Field name='groupSize' children={(fieldProps: FieldProps) =>
          <FormControl as={HStack} pr={4} isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel whiteSpace='nowrap'>Group size</FormLabel>
            <Slider onChange={(newValue) => fieldProps.form.setFieldValue(fieldProps.field.name, newValue)}
                    size='lg' defaultValue={3} min={2} max={7} step={1}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={8} borderWidth={2} borderColor='blue.500'>
                <Text fontWeight={600}>{fieldProps.field.value}</Text>
              </SliderThumb>
            </Slider>
          </FormControl>} />
  )
}

export function FileUploader() {
  const allowedTypes = ['text/plain', 'text/csv']

  const header = (options: FileUploadHeaderTemplateOptions) =>
      <ButtonGroup w='full' justifyContent='center'>
        {options.chooseButton}
      </ButtonGroup>

  const empty =
      <VStack h='full'>
        <Icon boxSize='30%' as={AiOutlineCloudUpload} color='gray.200' />
        <Text color='gray.600'>drag & drop a file here</Text>
      </VStack>

  const itemTemplate = (file: any) =>
      <VStack h='full' fontSize='sm' spacing={4}>
        <Icon boxSize='4rem' opacity={0.1} as={ImFileText2}/>
        <Text textAlign='start' fontWeight={600}>{file.name}</Text>
      </VStack>

  return (
      <Field name='students' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <ChakraFileUpload p={4} minH='2xs' headerTemplate={header} emptyTemplate={empty} itemTemplate={itemTemplate}
                              chooseLabel='Select File' rounded='3xl' border='2px dashed' borderColor='gray.200'
                              onSelect={event => {
                                if (allowedTypes.includes(event.files[0]?.type))
                                    event.files[0].text().then(content =>
                                        fieldProps.form.setFieldValue('students', Array.from(getEmails(content))))
                                else fieldProps.form.setFieldError('students', 'File type is not supported.') }}
                              progressBarTemplate={
              <Center textAlign='center' fontWeight={600} color='purple.500'>
                <Text maxW='xs'>{fieldProps.meta.error || `Detected ${fieldProps.field.value.length} emails.`}</Text>
              </Center>} />
          </FormControl>} />
  )
}

export function CollaboratorsField({ existingAdmins }: { existingAdmins?: Array<AdminProps> }) {
  return (
      <FieldArray name='collaborators' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <Stack my={3}>
            <HStack justify='space-between' w='60%' px={4}>
              <FormLabel>Name</FormLabel>
              <FormLabel>Email</FormLabel>
            </HStack>
            {existingAdmins?.map(admin =>
                <HStack key={admin.id} pr={12}>
                  <Input value={admin.name} isDisabled />
                  <Input value={admin.email} isDisabled />
                </HStack>)}
            {fieldArrayProps.form.values.collaborators.map((collaborator: AdminProps, index: number) =>
                (!existingAdmins?.find(admin => admin.email === collaborator.email)) &&
                    <HStack key={index}>
                      <Field name={`collaborators.${index}.name`} children={(fieldProps: FieldProps) =>
                          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                            <Input {...fieldProps.field} placeholder='Enter name' />
                          </FormControl>} />
                      <Field key={index} name={`collaborators.${index}.email`} children={(fieldProps: FieldProps) =>
                          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                            <Input {...fieldProps.field} placeholder='Enter Email' />
                          </FormControl>} />
                      <IconButton icon={<MdOutlineClose />} isRound variant='ghost' aria-label='remove collaborator'
                                  cursor='pointer' onClick={() => fieldArrayProps.remove(index)}/>
                    </HStack>)}
              <Button py={2} variant='ghost' leftIcon={<BiPlus />} onClick={() =>
                  fieldArrayProps.push(collaboratorSchema.getDefaultFromShape())}>
                Add
              </Button>
          </Stack>} />
  )
}