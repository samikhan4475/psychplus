'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const TestSelect = () => {
  const options = useCodesetOptions(CODESETS.ResourceStatus)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Test</FormFieldLabel>
      <SelectInput
        options={options}
        field="resourceStatus"
        buttonClassName="h-6"
        placeholder={'Select Test'}
      />
    </FormFieldContainer>
  )
}

export { TestSelect }
