import { Icon } from '@chakra-ui/icons'
import {
  Button, chakra, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputRightElement,
  Stack, Text, useRadio, useRadioGroup, VStack
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps } from 'formik'
import { lowerCase } from 'lodash'
import React, { ComponentProps } from 'react'
import { BiCheckCircle, BiPlus, BiSelectMultiple, BiText } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'

export function QuestionContentField() {
  return (
      <Field name='content' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <InputGroup>
              <Input {...fieldProps.field} placeholder='Enter your question here' />
              <InputRightElement>
                <Text>?</Text>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}


function CardRadio(props: ComponentProps<any>) {
  const { icon, ...radioProps } = props
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps)
  return (
      <chakra.label {...htmlProps} cursor='pointer'>
        <input {...getInputProps()} hidden />
        <HStack {...getCheckboxProps()} p={2} rounded='xl' borderWidth={2} boxShadow='lg' borderColor={state.isChecked ? 'blue.500' : 'gray.200'}>
          <Icon as={props.icon} boxSize='2.5rem' p={1} rounded='full' bg={state.isChecked ? 'blue.500' : 'gray.200'}
                color={state.isChecked ? 'white' : 'gray.700'} borderWidth={7} borderColor={state.isChecked ? 'blue.100' : 'gray.100'} />
          <Text color={state.isChecked ? 'blue.500' : 'gray.700'} textTransform='capitalize' {...getLabelProps()}>
            {lowerCase(radioProps.value.replace('_', ' '))}
          </Text>
        </HStack>
      </chakra.label>
  )
}

export function QuestionTypeField() {
  const { getRadioProps, getRootProps } = useRadioGroup({ name: 'questionType' })
  return (
      <Field name='questionType' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <Stack {...getRootProps()} {...fieldProps.field} spacing={3} fontWeight={500}>
              <CardRadio {...getRadioProps({ ...fieldProps.field, value: 'SINGLE_CHOICE' })} icon={BiCheckCircle} />
              <CardRadio {...getRadioProps({ ...fieldProps.field, value: 'MULTIPLE_CHOICE' })} icon={BiSelectMultiple} />
              <CardRadio {...getRadioProps({ ...fieldProps.field, value: 'TEXT' })} icon={BiText} />
            </Stack>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl> }/>
  )
}

export function ChoiceBasedQuestion() {
  return (
      <FieldArray name='answers' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <VStack p={0}>
            {fieldArrayProps.form.values.answers.map((_: string, index: number) =>
                <Field key={index} name={`answers.${index}`} children={(fieldProps: FieldProps) =>
                  <FormControl as={HStack} isDisabled={fieldArrayProps.form.values.type === 'TEXT'}
                               isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                    <FormLabel whiteSpace='nowrap'>Answer {index+1}</FormLabel>
                    <InputGroup>
                      <Input {...fieldProps.field} />
                      {(index > 1) &&
                        <InputRightElement>
                          <IconButton icon={<MdOutlineClose />} isRound variant='ghost' aria-label='remove answer'
                                      cursor='pointer' onClick={() => fieldArrayProps.remove(index)}/>
                        </InputRightElement>}
                    </InputGroup>
                    <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                </FormControl>} />)}
            <Button variant='ghost' py={2} leftIcon={<BiPlus />} isDisabled={fieldArrayProps.form.values.type === 'TEXT'}
                    onClick={() => fieldArrayProps.push('')}>Add Answer</Button>
          </VStack>} />
  )
  
}
