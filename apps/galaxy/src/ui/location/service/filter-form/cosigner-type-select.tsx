'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const CosignerTypeSelect = () => {
  const option = useCodesetOptions(CODESETS.CosignerType, '', [CODE_NOT_SET])
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Cosigner Type</FormFieldLabel>
      <SelectInput
        field="coSignerType"
        options={transformInOptions(option)}
        size="1"
        buttonClassName="h-6 w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { CosignerTypeSelect }
