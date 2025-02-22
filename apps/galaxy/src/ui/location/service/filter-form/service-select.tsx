'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const ServiceSelect = () => {
  const options = useCodesetOptions(CODESETS.ServicesOffered, undefined, [
    CODE_NOT_SET,
  ])
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        name="service"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
