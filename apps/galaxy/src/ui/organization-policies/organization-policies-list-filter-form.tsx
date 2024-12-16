'use client'

import { FormContainer } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { ClearButton } from './clear-button'
import { InsuranceDateField } from './insurance-date'
import { PolicyTypeSelect } from './policy-type-select'
import { StatusSelect } from './status-select'

const schema = z.object({
  type: z.string().optional(),
  insuranceDate: z.custom<DateValue>().nullable(),
  status: z.string().optional(),
  policyName :z.string().optional(),
  policy: z.string().optional(),
  policyId: z.string().optional(),
  signingDate: z.string().optional(),
  insurancedDate: z.string().optional(),
  practice: z.string().optional(),
  organization: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationPoliciesListFilterForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      type: '',
      insuranceDate: undefined,
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2 flex-wrap"
      form={form}
      onSubmit={onSubmit}
    >
      <PolicyTypeSelect />
      <InsuranceDateField />
      <StatusSelect />
      <ClearButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { OrganizationPoliciesListFilterForm, type SchemaType }
