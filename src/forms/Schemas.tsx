import { array, date, InferType, object, ref, setLocale, string } from 'yup'

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
  question: object({
    title: string().ensure().required().min(10).max(200),
    type: string().ensure().required().oneOf(['text', 'single choice', 'multiple choice']),
    answers: array().of(string().ensure().required().min(1).max(20)).default(['', ''])
        .when('type', { is: 'single choice' || 'multiple choice', then: (answerSchema: InferType<any>) => answerSchema.min(2) })
  }),
  startDate: date(), endDate: date()
})