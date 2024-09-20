'use client'

import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { getAllSecureMessagesAction } from './actions'
import { MessageSection } from './message-section'
import { useStore } from './store'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  from: z.string().optional(),
  status: z.string().optional(),
  name: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const SecureMessagesView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { setSecureMessages } = useStore((state) => state)

  useEffect(() => {
    const fetchMessages = async () => {
      const secureMessages = await getAllSecureMessagesAction()
      if (secureMessages.state === 'error') {
        return secureMessages.error
      }
      setSecureMessages(secureMessages.data)
    }
    fetchMessages()
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

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: implement when integrating APIs
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="h-fit min-w-fit" ref={ref}>
        <MessageSection />
      </Flex>
    </FormContainer>
  )
}

export { SecureMessagesView }
