'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getInsurancePlansOptionsAction } from '@/ui/patient-lookup/actions'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const PrimaryInsuranceSelect = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
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

  const insurancePolicies = form.watch('primaryInsurancePolicyIds')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Primary Insurance</FormFieldLabel>
      <MultiSelectField
        options={insurancePlansOptions}
        className="flex-1"
        defaultValues={insurancePolicies}
        onChange={(values) =>
          form.setValue('primaryInsurancePolicyIds', values)
        }
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceSelect }
