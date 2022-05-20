import { IconType } from 'react-icons'
import { BiCheckCircle, BiPalette, BiSelectMultiple, BiWrench } from 'react-icons/bi'
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

export const selectOptions: Record<string, Array<{ value: string, icon: IconType }>> = {
  'questionType': [{ value: 'Single Choice', icon: BiCheckCircle }, { value: 'Multiple Choice', icon: BiSelectMultiple }],
  'questionCategory': [{ value: 'Preferences', icon: BiPalette }, { value: 'Skills', icon: BiWrench }]
}

export const collaboratorSchema = object({
  name: string().ensure().required(),
  email: string().ensure().email('Not a valid email address')
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
  questionType: string().ensure().required(),
  questionCategory: string().ensure().required(),
  matchingStrategy: string().ensure().required(),
  answers: array().of(string().ensure().required().min(1).max(200)).default(['', '']),
  publishDate: date(),
  dueDate: date(),
  groupSize: number().default(3).min(2).max(7).required(),
  students: array().default([]).of(string().ensure().email(context =>
    <span key={context.path}>Line {Number(context.path?.match(/\d+/g))+1} is not a valid email address<br/></span>)),
  collaborators: array().default([]).of(collaboratorSchema)
})
