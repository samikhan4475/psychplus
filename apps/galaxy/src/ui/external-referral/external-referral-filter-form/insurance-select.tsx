'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getInsuranceOptionsAction } from '../actions'
import { ExternalReferralSchemaType } from './schema'

const InsuranceSelect = () => {
  const form = useFormContext<ExternalReferralSchemaType>()
  const [insuranceOptions, setInsuranceOptions] = useState<SelectOptionType[]>(
    [],
  )

  useEffect(() => {
    getInsuranceOptionsAction().then((plansResult) => {
      if (plansResult.state === 'success') {
        setInsuranceOptions(plansResult.data)
      }
    })
  }, [])

  const insurancePolicies = form.watch('insurancePolicyIds')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <MultiSelectField
        options={insuranceOptions}
        className="flex-1"
        defaultValues={insurancePolicies}
        onChange={(values) => form.setValue('insurancePolicyIds', values)}
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
