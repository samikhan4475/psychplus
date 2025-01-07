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

interface InsuranceSelectProps {
  label: string
  fieldName: 'primaryInsurancePolicyIds' | 'secondaryInsurancePolicyIds'
}

const InsuranceSelect = ({ label, fieldName }: InsuranceSelectProps) => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const [insurancePlansOptions, setInsurancePlansOptions] = useState<SelectOptionType[]>([])

  useEffect(() => {
    const fetchInsurancePlans = async () => {
      const plansResult = await getInsurancePlansOptionsAction()
      if (plansResult.state === 'success') {
        const options = plansResult.data
        setInsurancePlansOptions(options)
      }
    }

    fetchInsurancePlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (values: string[]) => {
    form.setValue(fieldName, values)
  }

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">{label}</FormFieldLabel>
      <MultiSelectField
        options={insurancePlansOptions}
        className="flex-1"
        defaultValues={form.watch(fieldName)}
        onChange={handleChange}
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
