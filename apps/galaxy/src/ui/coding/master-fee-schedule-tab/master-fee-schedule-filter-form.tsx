import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, FormError } from '@/components'
import { sanitizeFormData } from '@/utils'
import { AgeRangeField } from './age-range-field'
import { CategorySelectField } from './category-select-field'
import { ClearFilterFormButton } from './clear-filter-form-button'
import { CptField } from './cpt-field'
import { DescriptionField } from './description-field'
import { GenderSelectField } from './gender-select-field'
import { PosSelectField } from './pos-select-field'
import { StatusSelectField } from './status-field'
import { useStore } from './store'
import { SubmitFormButton } from './submit-form-button'

const schema = z.object({
  cptCode: z.string().optional(),
  placeOfService: z.string().optional(),
  description: z.string().optional(),
  requirement: z.string().optional(),
  category: z.string().optional(),
  gender: z.string().optional(),
  recordStatus: z.string().optional(),
  minimumAge: z.string().optional(),
  maximumAge: z.string().optional(),
})
type SchemaType = z.infer<typeof schema>
const MasterFeeScheduleFilterForm = () => {
  const { error, search } = useStore((state) => ({
    error: state.error,
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      recordStatus: '',
      cptCode: '',
      placeOfService: '',
      description: '',
      requirement: '',
      category: '',
      gender: '',
      minimumAge: '',
      maximumAge: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const sanitizedData = sanitizeFormData(data)
    return search(sanitizedData, 1, true)
  }

  return (
    <>
      <FormError message={error} />
      <FormContainer
        className="bg-white flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
        form={form}
        onSubmit={onSubmit}
      >
        <CptField />
        <PosSelectField />
        <DescriptionField />
        <CategorySelectField />
        <GenderSelectField />
        <AgeRangeField />
        <StatusSelectField />
        <ClearFilterFormButton />
        <SubmitFormButton />
      </FormContainer>
    </>
  )
}

export { MasterFeeScheduleFilterForm, type SchemaType }
