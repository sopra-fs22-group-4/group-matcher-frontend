import { Icon } from '@chakra-ui/icons'
import {
    FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useBoolean
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import { startCase } from 'lodash'
import React from 'react'
import { IconType } from 'react-icons'
import {AiOutlineMail, AiOutlineUser} from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import useLocalStorage from "use-local-storage";

export function NameField({ fieldName, icon }: { fieldName?: string, icon: IconType }) {
  return (
      <Field name={fieldName || 'name'} children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>{startCase(fieldName) || 'Your Name'}</FormLabel>
            <InputGroup>
              <InputRightElement>
                <Icon as={icon} boxSize={5} color='gray.500' />
              </InputRightElement>
              <Input {...fieldProps.field} />
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function NameEditField() {
    const [adminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
    return (
        <Field name='name' children={(fieldProps: FieldProps) =>
            <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                    <InputRightElement>
                        <Icon as={AiOutlineUser} boxSize={5} color='gray.500' />
                    </InputRightElement>
                    <Input {...fieldProps.field} placeholder={adminData?.name} _placeholder={{opacity: 1, color: 'blue.800'}}/>
                </InputGroup>
                <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
            </FormControl>}/>
    )
}

export function EmailField() {
  return (
      <Field name='email' children={(fieldProps: FieldProps) =>
          <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputRightElement>
                <Icon as={AiOutlineMail} color='gray.500' />
              </InputRightElement>
              <Input {...fieldProps.field} type='email' autoComplete='new-password' />
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function EmailEditField() {
    const [adminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
    return (
        <Field name='email' children={(fieldProps: FieldProps) =>
            <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                    <InputRightElement>
                        <Icon as={AiOutlineMail} color='gray.500' />
                    </InputRightElement>
                    <Input {...fieldProps.field} placeholder={adminData?.email} _placeholder={{opacity: 1, color: 'blue.800'}} type='email' autoComplete='new-password' />
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
              <InputRightElement>
                <IconButton icon={showPassword ? <FaEye /> : <FaEyeSlash />} variant='ghost' isRound
                            aria-label='toggle show password' cursor='pointer' onClick={toggle}/>
              </InputRightElement>
              <Input {...fieldProps.field} placeholder={(repeat ? 'Repeat ' : '')+'Password'}
                     type={showPassword ? 'text' : 'password'} autoComplete='new-password' />
            </InputGroup>
            <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
          </FormControl>}/>
  )
}

export function PasswordEditField({ repeat }: { repeat?: boolean }) {
    const [showPassword, { toggle }] = useBoolean()
    return (
        <Field name={repeat ? 'repeatPassword' : 'password'} children={(fieldProps: FieldProps) =>
            <FormControl isInvalid={fieldProps.meta.value && fieldProps.meta.error}>
                <FormLabel>{repeat && 'Repeat '}Password</FormLabel>
                <InputGroup>
                    <InputRightElement>
                        <IconButton icon={showPassword ? <FaEye /> : <FaEyeSlash />} variant='ghost' isRound
                                    aria-label='toggle show password' cursor='pointer' onClick={toggle}/>
                    </InputRightElement>
                    <Input {...fieldProps.field} placeholder={(repeat ? 'Repeat ' : '')+'New Password'}
                           type={showPassword ? 'text' : 'password'} autoComplete='new-password' _placeholder={{opacity: 1, color: 'blue.800'}}/>
                </InputGroup>
                <FormErrorMessage>{fieldProps.meta.value && fieldProps.meta.error}</FormErrorMessage>
            </FormControl>}/>
    )
}