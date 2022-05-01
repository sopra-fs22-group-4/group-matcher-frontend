import { Icon } from '@chakra-ui/icons'
import {
  Button, chakra, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputRightElement,
  Radio, Stack, Text, useRadio, useRadioGroup, VStack, Wrap
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
  const { icon, children, ...radioProps } = props
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps)
  const iconStyle = state.isChecked ?
      { bg: 'blue.500', color: 'white', borderColor: 'blue.100' } :
      { bg: 'gray.200',  color: 'gray.700', borderColor: 'gray.100' }
  return (
      <chakra.label {...htmlProps} cursor='pointer'>
        <input {...getInputProps()} hidden />
        <HStack {...getCheckboxProps()} px={3} py={2} rounded='xl' borderWidth={2} boxShadow='lg' borderColor={state.isChecked ? 'blue.500' : 'gray.200'}>
          {props.icon ? <Icon as={props.icon} boxSize='2.5rem' p={1} rounded='full' borderWidth={7} {...iconStyle} /> : <Radio {...radioProps} />}
          <Text color={state.isChecked ? 'blue.500' : 'gray.700'} textTransform='capitalize' {...getLabelProps()}>
            {children || lowerCase(radioProps.value.replace('_', ' '))}
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

export function SingleChoiceAnswers({ question }: { question: QuestionProps }) {
  const { getRadioProps, getRootProps } = useRadioGroup({ name: 'question-'+question.id })
  return (
      <Field name={'question-'+question.id} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <Wrap {...getRootProps()} {...fieldProps.field} spacing={4} fontWeight={500}>
              {question.answers.map(answer =>
                  <CardRadio key={answer.id} {...getRadioProps({ ...fieldProps.field, value: answer.id.toString() })} children={answer.content} />)}
            </Wrap>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}
