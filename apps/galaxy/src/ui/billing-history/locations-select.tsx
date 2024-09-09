'use client'

import { useEffect, useState } from 'react'
import { ActionResult } from '@/api'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getClinicsAction } from './actions'
import { SelectOptionType } from './types'

const LocationsSelect = () => {
  const [locationsResult, setLocationsResult] =
    useState<ActionResult<SelectOptionType[]>>()

  useEffect(() => {
    getClinicsAction().then(setLocationsResult)
  }, [])

  const isSuccess = locationsResult?.state === 'success'
  const options = isSuccess ? locationsResult?.data : []

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Locations</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="location"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]'
export { LocationsSelect }
