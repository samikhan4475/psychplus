'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'
import { getPrimaryProviderTypeOptions } from '../utils'

const PrimaryProviderSelect = () => {
  const codes = useCodesetOptions(CODESETS.ProviderType, '', [CODE_NOT_SET])
  const options = getPrimaryProviderTypeOptions(codes)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Primary Provider</FormFieldLabel>
      <SelectInput
        options={transformInOptions(options)}
        field="providerType"
        buttonClassName="w-[120px] h-6"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryProviderSelect }
