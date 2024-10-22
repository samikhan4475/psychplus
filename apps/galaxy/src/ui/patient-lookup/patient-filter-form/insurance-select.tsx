'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getInsurancePlansOptionsAction } from '../actions'
import { PatientLookUpSchemaType } from './schema'

const InsuranceSelect = () => {
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

  const form = useFormContext<PatientLookUpSchemaType>()
  const insurancePolicies = form.watch('insurancePolicyIds')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <MultiSelectField
        options={insurancePlansOptions}
        className="flex-1"
        defaultValues={insurancePolicies}
        onChange={(values) => form.setValue('insurancePolicyIds', values)}
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
