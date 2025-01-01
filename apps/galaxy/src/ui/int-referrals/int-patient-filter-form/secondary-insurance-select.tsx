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

const SecondaryInsuranceSelect = () => {
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

  const insurancePolicies = form.watch('secondaryInsurancePolicyIds')

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Secondary Insurance</FormFieldLabel>
      <MultiSelectField
        options={insurancePlansOptions}
        className="flex-1"
        defaultValues={insurancePolicies}
        onChange={(values) =>
          form.setValue('secondaryInsurancePolicyIds', values)
        }
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceSelect }
