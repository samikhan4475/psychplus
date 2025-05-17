'use client'

import { useMemo } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const AllergiesTypeSelect = () => {
  const codes = useCodesetCodes(CODESETS.AllergyType)
  const options = useMemo(
    () =>
      codes.map((code) => ({
        value: code.value,
        label: code.display,
      })),
    [],
  )

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Type</FormFieldLabel>
      <SelectInput
        options={options}
        field="allergyTypeCode"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}

export { AllergiesTypeSelect }
