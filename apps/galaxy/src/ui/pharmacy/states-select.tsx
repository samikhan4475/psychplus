'use client'

import { useEffect, useState } from 'react'
import { getClinicsOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'

const StateSelect = () => {
  const [states, setStates] = useState<SelectOptionType[]>([])

  useEffect(() => {
    getClinicsOptionsAction().then((res) => {
      if (res.state === 'success') {
        setStates(res.data)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">State</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="state"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={states}
        tooltip
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
