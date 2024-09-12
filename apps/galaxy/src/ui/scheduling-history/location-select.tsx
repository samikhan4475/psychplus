'use client'

import { useEffect, useState } from 'react'
import { ActionResult } from '@/api'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getClinicsAction } from './actions'
import { SelectOptionType } from './types'

const LocationSelect = () => {
  const [locationsResult, setLocationsResult] =
    useState<ActionResult<SelectOptionType[]>>()

  useEffect(() => {
    getClinicsAction().then(setLocationsResult)
  }, [])

  const isSuccess = locationsResult?.state === 'success'
  const options = isSuccess ? locationsResult?.data : []
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="location"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[109px]'
export { LocationSelect }
