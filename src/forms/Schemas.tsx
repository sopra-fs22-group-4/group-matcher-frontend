import { array, date, number, object, ref, setLocale, string } from 'yup'

setLocale({
  string: {
    min: context => `Enter at least ${context.min} characters`,
    max: context => `Enter at most ${context.max} characters`,
  },
  array: {
    min: context => `Enter at least ${context.min} values`
  }
})

export const baseSchema = object({
  name: string().ensure().required(),
  courseName: string().ensure().required(),
  university: string().ensure().required(),
  email: string().ensure().email('Not a valid email address'),
  password: string().ensure().required().min(6).max(20)
      .matches(/[a-zA-Z]/, 'Enter at least one character')
      .matches(/\d/, 'Enter at least one number'),
  repeatPassword: string().ensure().required().oneOf([ref('password'), null], 'Passwords do not match'),
  content: string().ensure().required().min(1).max(200),
  questionType: string().ensure().required().oneOf(['TEXT', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE']),
  answers: array().of(string().ensure().required().min(1).max(200)).default(['', '']),
  publishDate: date(),
  dueDate: date(),
  groupSize: number().default(3).min(0).max(8).required(),
  students: array().of(string().ensure().email('Not a valid email address')).default([])
})