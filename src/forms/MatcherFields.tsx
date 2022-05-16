import { Icon } from '@chakra-ui/icons'
import {
  Button, ButtonGroup, chakra, FormControl, FormErrorMessage, FormLabel, Heading, HStack, IconButton, Input, InputGroup,
  InputRightElement, RadioProps, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Stat, StatLabel,
  StatNumber, Text, useRadio, useRadioGroup, useStyleConfig, VStack
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps } from 'formik'
import { Calendar } from 'primereact/calendar'
import { FileUpload, FileUploadHeaderTemplateOptions } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import React, { ComponentProps } from 'react'
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { HiCalendar } from 'react-icons/hi'
import { ImFileText2 } from 'react-icons/im'
import { MdOutlineClose } from 'react-icons/md'
import { StatIcon } from '../components/Buttons'
import { baseSchema } from './Schemas'

const ChakraCalendar = chakra(Calendar)
const ChakraFileUpload = chakra(FileUpload)
const ChakraProgressBar = chakra(ProgressBar)

export function DateTimePicker(props: ComponentProps<any>) {
  const variant = props.variant || 'outline'
  const fieldStyle: any = useStyleConfig('Input', { variant })
  return <ChakraCalendar showTime showIcon={variant === 'outline'} dateFormat='dd/mm/yy'
                         __css={fieldStyle.field} {...props} />
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

export function DateEditor({ prefix, disable }: { prefix: string, disable?: boolean }) {
  return (
      <Stat maxW='fit-content'>
        <HStack>
          <StatIcon icon={HiCalendar}/>
          <StatLabel whiteSpace='nowrap' textTransform='capitalize'>{prefix} Date</StatLabel>
        </HStack>
        <StatNumber>
          <Field name={prefix + 'Date'} children={(fieldProps: FieldProps) =>
              <DateTimePicker variant='filled' {...fieldProps.field} disabled={disable} />}/>
        </StatNumber>
      </Stat>
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

export function CollaboratorsField() {
  const defaults: any = baseSchema.pick(['collaborators']).getDefaultFromShape()
  return (
      <FieldArray name='collaborators' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <Stack my={3}>
            <HStack justify='space-between' w='60%' px={4}>
              <FormLabel>Name</FormLabel>
              <FormLabel>Email</FormLabel>
            </HStack>
            {fieldArrayProps.form.values.collaborators.map((_collaborator: string, index: number) =>
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
              <Button py={2} variant='ghost' leftIcon={<BiPlus />} onClick={() => fieldArrayProps.push(defaults[0])}>
                Add
              </Button>
          </Stack>} />
  )
}

export function StudentsField() {
  return (
      <FieldArray name='students' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <Stack p={2} maxH='10rem' overflow='auto'>
            {fieldArrayProps.form.values.students.map((_student: string, index: number) =>
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