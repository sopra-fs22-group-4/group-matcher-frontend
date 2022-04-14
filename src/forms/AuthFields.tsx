import { Icon } from '@chakra-ui/icons'
import {
  FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useBoolean
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export function EmailField() {
  return (
      <Field name='email' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <Input {...fieldProps.field} placeholder='max.muster@email.com' type='email' />
              <InputRightElement>
                <Icon as={AiOutlineMail} color='gray.500' />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function PasswordField({ repeat }: { repeat?: boolean }) {
  const [showPassword, { toggle }] = useBoolean()
  return (
      <Field name={repeat ? 'repeatPassword' : 'password'} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>{repeat && 'Repeat '}Password</FormLabel>
            <InputGroup>
              <Input {...fieldProps.field} placeholder={(repeat ? 'Repeat ' : '')+'Password'} type={showPassword ? 'text' : 'password'}/>
              <InputRightElement>
                <IconButton icon={showPassword ? <FaEye /> : <FaEyeSlash />} h='full' p={3} variant='ghost'
                            aria-label='toggle show password' cursor='pointer' onClick={toggle}/>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}