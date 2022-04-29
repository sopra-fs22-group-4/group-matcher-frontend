import {
  Button, Collapse, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputRightElement,
  Radio, RadioGroup, VStack
} from '@chakra-ui/react'
import { Field, FieldArray, FieldArrayRenderProps, FieldProps } from 'formik'

import { BiPlus } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'

export function QuestionTitleField() {
  return (
      <Field name='question.title' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>Question Title</FormLabel>
            <Input {...fieldProps.field} />
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function QuestionTypeField() {
  return (
      <Field name='question.type' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>Question Type</FormLabel>
            <RadioGroup>
              <HStack spacing={5}>
                <Radio {...fieldProps.field} value='single choice'>Single Choice</Radio>
                <Radio {...fieldProps.field} value='multiple choice'>Multiple Choice</Radio>
                <Radio {...fieldProps.field} value='text'>Text</Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function ChoiceBasedQuestion() {
  return (
      <FieldArray name='question.answers' children={(fieldArrayProps: FieldArrayRenderProps) =>
          <Collapse in={fieldArrayProps.form.values.question.type === 'single choice' || fieldArrayProps.form.values.question.type === 'multiple choice'}>
            <VStack>
              {fieldArrayProps.form.values.question.answers.map((answer: string, index: number) =>
                  <Field key={index} name={`question.answers.${index}`} children={(fieldProps: FieldProps) =>
                    <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                      <FormLabel>Answer {index+1}</FormLabel>
                      <InputGroup>
                        <Input {...fieldProps.field} />
                        {(index > 1) &&
                          <InputRightElement>
                            <IconButton icon={<MdOutlineClose />} h='full' p={3} variant='ghost' aria-label='remove answer'
                                        cursor='pointer' onClick={() => fieldArrayProps.remove(index)}/>
                          </InputRightElement>}
                      </InputGroup>
                      <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
                  </FormControl>} />)}
              <Button variant='ghost' leftIcon={<BiPlus />} onClick={() => fieldArrayProps.push('')}>Add Answer</Button>
            </VStack>
          </Collapse>} />
  )
  
}
