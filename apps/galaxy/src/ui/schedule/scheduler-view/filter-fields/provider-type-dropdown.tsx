'use client'

import { useMemo } from 'react'
import { SelectInput } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const options = useMemo(
    () =>
      codes
        .filter((code) => code.value !== CODE_NOT_SET)
        .map((code) => {
          const value =
            code.attributes?.find((attr) => attr.name === 'ResourceId')
              ?.value ?? ''
          return {
            label: code.display,
            value,
          }
        }),
    [codes],
  )

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <SelectInput
        field="specialistTypeCode"
        options={options}
        placeholder="Select"
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
