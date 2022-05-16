import { Divider, HStack, Stack, TabList, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { Children, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'use-http'
import { StepTab, TabNavButtons } from './FormProgress'
import { baseSchema } from './Schemas'

export default function StepsForm({ fields, url, children, flatten }: { fields: any, url: string, children: ReactNode, flatten?: boolean }) {
  const { post, response, error } = useFetch(url)
  const navigate = useNavigate()
  const toast = useToast()
  const schema = baseSchema.pick(fields)
  const numSteps = Children.count(children)

  useEffect(() => () => window.location.reload(), [])

  const onSubmit = (values: FormikValues) =>
    post(flatten ? Object.keys(values).flat() : values).then(
        () => navigate(`/dashboard/matchers/${response.data.id}`),
        () => toast({ title: error?.message, status: 'error' }))

  return (
      <Formik initialValues={schema.getDefaultFromShape()} validationSchema={schema} onSubmit={onSubmit}>
        {(_formProps: FormikProps<any>) =>
            <Tabs as={Form} w='60%' display='flex' flexDir='column' gap={6} variant='solid-rounded'>
              <Stack p={10} bg='white' boxShadow='lg' rounded='3xl' borderWidth={1} spacing={5}>
                <TabList as={HStack} justifyContent='space-between' spacing={3} px={6}>
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