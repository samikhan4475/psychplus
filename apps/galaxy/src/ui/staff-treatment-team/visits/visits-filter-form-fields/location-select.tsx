'use client'

import { useEffect, useState } from 'react'
import { getClinicsOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'

const LocationSelect = () => {
  const [locationsResult, setLocationsResult] = useState<SelectOptionType[]>([])

  useEffect(() => {
    getClinicsOptionsAction().then((res) => {
      if (res.state === 'success') {
        setLocationsResult(res.data)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        buttonClassName={buttonClassName}
        options={locationsResult}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[200px]'
export { LocationSelect }
