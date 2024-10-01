'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { MessageSection } from './message-section'
import { useStore } from './store'

const schema = z.object({
  startDate: z.custom<DateValue>().optional(),
  endDate: z.custom<DateValue>().optional(),
  from: z.string().optional(),
  status: z.string().optional(),
  name: z.string().optional(),
  subject: z.string().optional(),
  searchMessage: z.string().optional(),
})

export type SchemaType = z.infer<typeof schema>

const SecureMessagesView = () => {
  const { fetch, loading } = useStore((state) => state)

  useEffect(() => {
    fetch()
  }, [])

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      from: '',
      status: '',
      name: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // Will remove console once integrate API
    console.log('Submitted Data: ', data)
  }
  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="h-fit min-w-fit  pt-2"
    >
      <MessageSection />
    </FormContainer>
  )
}

export { SecureMessagesView }
