'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'
import { getLocationTypeOptions } from '../utils'

const LocationTypeSelect = () => {
  const codes = useCodesetOptions(CODESETS.LocationType)
  const options = getLocationTypeOptions(codes)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Location Type</FormFieldLabel>
      <SelectInput
        options={transformInOptions(options)}
        field="locationType"
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { LocationTypeSelect }
