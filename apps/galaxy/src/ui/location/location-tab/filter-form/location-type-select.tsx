'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const LocationTypeSelect = () => {
  const options = useCodesetOptions(CODESETS.LocationType)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Location Type</FormFieldLabel>
      <SelectInput
        field="locationType"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { LocationTypeSelect }
