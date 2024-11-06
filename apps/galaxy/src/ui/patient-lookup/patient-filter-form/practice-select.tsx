'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '../actions'
import { PatientLookUpSchemaType } from './schema'

const PracticeSelect = () => {
  const form = useFormContext<PatientLookUpSchemaType>()

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
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
