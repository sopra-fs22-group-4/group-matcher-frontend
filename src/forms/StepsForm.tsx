import { Divider, HStack, Stack, TabList, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { Children, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { StepTab, TabNavButtons } from './FormProgress'
import { baseSchema } from './Schemas'


export default function StepsForm({ fields, url, children, noRedirect }: StepsFormProps) {
  const { post, response } = useFetch(url)
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(fields)
  const numSteps = Children.count(children)

  useEffect(() => () => window.location.reload(), [])

  const onSubmit = (values: FormikValues) => post(noRedirect ? Object.values(values).flat() : values).then(data => {
    if (response.ok)
      noRedirect ? toast({ title: 'Your response has been saved!', description: 'You can close this window now.',
        status: 'success', duration: null }) : navigate(url)
    else toast({ title: data.message, status: 'error' })
  })

  return (
      <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={onSubmit}>
        {(_formProps: FormikProps<any>) =>
            <Tabs as={Form} w='60%' display='flex' flexDir='column' gap={6} variant='solid-rounded'>
              <Stack p={10} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={5}>
                <TabList as={HStack} justifyContent='space-between' spacing={3}>
                  {[...Array(numSteps)].map((_, index) =>
                      <StepTab key={index} index={index} isLast={index === numSteps-1} />)}
                </TabList>
                <Divider borderBottomWidth={2} />
                <TabPanels>
                  {children}
                </TabPanels>
              </Stack>
              <TabNavButtons lastIndex={numSteps-1} />
            </Tabs>}
      </Formik>
  )
}