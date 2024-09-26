'use client'

import { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getInsuranceProvidersAction } from './actions'

const InsuranceSelect = () => {
  const [insuranceProviders, setInsuranceProviders] = useState<
    SelectOptionType[]
  >([])

  useEffect(() => {
    getInsuranceProvidersAction().then((res) => {
      if (res.state === 'success') {
        setInsuranceProviders(res.data)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="insurance"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={insuranceProviders}
        tooltip
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
