'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getPracticesOptionsAction } from '../patient-lookup/actions'
import { SchemaType } from './organization-users-list-filter-form'

const PracticeSelect = () => {
  const form = useFormContext<SchemaType>()

  const [practicesOptions, setPracticesOptions] = useState<SelectOptionType[]>(
    [],
  )
  useEffect(() => {
    getPracticesOptionsAction().then((practiceResult) => {
      if (practiceResult.state === 'success') {
        setPracticesOptions(practiceResult.data)
      }
    })
  }, [])

  const practices = form.watch('practices')
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <MultiSelectField
        options={practicesOptions}
        defaultValues={practices}
        onChange={(values) => form.setValue('practices', values)}
        className="flex-1 min-w-[112px]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
