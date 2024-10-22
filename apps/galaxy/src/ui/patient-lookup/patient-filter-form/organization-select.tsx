'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { PatientLookUpSchemaType } from './schema'
import { getOrganizationOptionsAction } from '../actions'
import { SelectOptionType } from '@/types'

const OrganizationSelect = () => {
  const [organizationsOptions, setOrganizationsOptions] = useState<
  SelectOptionType[]
>([])
  const form = useFormContext<PatientLookUpSchemaType>()

  const organizations = form.watch('organizations')

  useEffect(() => {
    getOrganizationOptionsAction().then((organizationResult) => {
      if (organizationResult.state === 'success') {
        setOrganizationsOptions(organizationResult.data)
      }
    })
  }, [])
  
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <MultiSelectField
        onChange={(values) => form.setValue('organizations', values)}
        defaultValues={organizations}
        options={organizationsOptions}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
