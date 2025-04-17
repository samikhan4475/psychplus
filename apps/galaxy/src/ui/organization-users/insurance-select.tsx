'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getInsurancePlansOptionsAction } from '../patient-lookup/actions'
import { SchemaType } from './organization-users-list-filter-form'

const InsuranceSelect = () => {
  const form = useFormContext<SchemaType>()
  const [insurancePlansOptions, setInsurancePlansOptions] = useState<
    SelectOptionType[]
  >([])

  useEffect(() => {
    getInsurancePlansOptionsAction().then((plansResult) => {
      if (plansResult.state === 'success') {
        setInsurancePlansOptions(plansResult.data)
      }
    })
  }, [])

  const insurancePolicies = form.watch('insurancePolicyIds')
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <MultiSelectField
        options={insurancePlansOptions}
        className="h-6 w-[101px] flex-1"
        defaultValues={insurancePolicies}
        onChange={(values) => form.setValue('insurancePolicyIds', values)}
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
