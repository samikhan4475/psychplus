'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { IssuanceSelect } from './issuance-select'
import { PolicyTypeSelect } from './policy-type-select'
import { StatusSelect } from './status-select'

const schema = z.object({
  status: z.string().optional(),
  policyType: z.string().optional(),
  issuanceDate: z.custom<DateValue>(),
})

type PolicyConsentFilterSchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const form = useForm<PolicyConsentFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: '',
      policyType: '',
      issuanceDate: undefined,
    },
  })

  const onSubmit: SubmitHandler<PolicyConsentFilterSchemaType> = (data) => {
    console.log('Form submitted with data:', data)
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white px-2 py-1 shadow-5"
    >
      <Flex gap="2" align="center">
        <PolicyTypeSelect />
        <IssuanceSelect />
        <StatusSelect />
        <Button
          variant="outline"
          color="gray"
          size="1"
          className="text-black  font-regular"
        >
          Clear
        </Button>
        <Button type="submit" size="1" highContrast>
          <Search height={14} width={14} />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { FilterForm, type PolicyConsentFilterSchemaType }
