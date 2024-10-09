'use client'

import { useEffect, useState } from 'react'
import { getClinicsOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'

const LocationsSelect = () => {
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
      <FormFieldLabel className="!text-1">Locations</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="locationId"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={locationsResult}
        tooltip
      />
    </FormFieldContainer>
  )
}

export { LocationsSelect }
