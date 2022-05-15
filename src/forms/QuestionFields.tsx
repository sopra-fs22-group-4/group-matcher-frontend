import { Icon } from '@chakra-ui/icons'
import {
  Button, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputRightElement,
  SimpleGrid, Text, useRadio, useRadioGroup, VStack, Wrap
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps } from 'formik'
import React, { ComponentProps } from 'react'
import { BiPlus } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import { selectOptions } from './Schemas'

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
  const { state, getInputProps, getCheckboxProps } = useRadio(radioProps)
  const style = state.isChecked ?
      { bg: 'blue.500', color: 'white', borderColor: 'blue.100' } :
      { bg: 'gray.200',  color: 'gray.700', borderColor: 'gray.100' }
  return (
      <Button as='label' variant='card' {...getCheckboxProps()}>
        <input {...getInputProps()} />
        <HStack>
        <Icon as={props.icon} boxSize='2.5rem' p={1} rounded='full' borderWidth={7} {...style} />
          <Text fontWeight={500}>
            {radioProps.value}
          </Text>
        </HStack>
      </Button>
  )
}

export function SelectionField({ name }: { name: string }) {
  const { getRadioProps, getRootProps } = useRadioGroup({ name })
  return (
      <Field name={name} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <SimpleGrid {...getRootProps(fieldProps.field)} columns={2} spacing={3}>
              {selectOptions[name].map(selectOption =>
                  <CardRadio {...getRadioProps({ value: selectOption.value })}
                             isChecked={selectOption.value === fieldProps.field.value}
                             icon={selectOption.icon} key={selectOption.value} /> )}
            </SimpleGrid>
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
                  <CardRadio key={answer.id} {...getRadioProps({ ...fieldProps.field, value: answer.id.toString() })}
                             children={answer.content} />)}
            </Wrap>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}
