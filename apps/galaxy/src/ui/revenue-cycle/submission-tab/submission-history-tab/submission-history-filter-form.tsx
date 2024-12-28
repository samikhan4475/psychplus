'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { BatchNameInput } from './batch-name-input'
import { ClearFilterFormButton } from './clear-filter-form-button'
import { InsurancePolicyTypeSelect } from './insurance-policy-type-select'
import { useStore } from './store'
import { SubmitDateInput } from './submit-date-input'

const schema = z.object({
  batchName: z.string(),
  insurancePolicyPriority: z.string().optional(),
  submittedDate: z.custom<string | DateValue>().nullable(),
})

type SchemaType = z.infer<typeof schema>
const SubmissionHistoryFilterForm = () => {
  const { error, search } = useStore((state) => ({
    error: state.error,
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      batchName: '',
      submittedDate: undefined,
      insurancePolicyPriority: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      submittedDate: formatDateToISOString(data.submittedDate as DateValue),
    }
    const sanitizedData = sanitizeFormData(formattedData)
    return search(sanitizedData, 1, true)
  }

  return (
    <>
      <FormError message={error} />
      <FormContainer
        form={form}
        onSubmit={onSubmit}
        className="bg-white my-2 flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      >
        <BatchNameInput />
        <SubmitDateInput />
        <InsurancePolicyTypeSelect />
        <ClearFilterFormButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </FormContainer>
    </>
  )
}

export { SubmissionHistoryFilterForm, type SchemaType }
