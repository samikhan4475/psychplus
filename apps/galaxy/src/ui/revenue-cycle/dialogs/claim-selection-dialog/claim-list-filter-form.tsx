import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { ClaimListSearchParams } from '../../types'
import { ClaimNumberField } from './claim-number-field'
import { ClearFilterFormButton } from './clear-filter-form-button'
import { PatientIdField } from './patient-id-field'
import { useStore } from './store'
import { SubmitFormButton } from './submit-form-button'

const schema = z.object({
  claimNumber: z.string().trim().optional(),
  patientId: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const ClaimListFilterForm = () => {
  const { claimsListSearch } = useStore((state) => ({
    claimsListSearch: state.claimsListSearch,
  }))

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const cleanedData = sanitizeFormData(data) as ClaimListSearchParams
    return claimsListSearch(cleanedData)
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      claimNumber: '',
      patientId: '',
    },
  })
  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <PatientIdField />
      <ClaimNumberField />
      <ClearFilterFormButton />
      <SubmitFormButton />
    </FormContainer>
  )
}

export { ClaimListFilterForm, type SchemaType }
