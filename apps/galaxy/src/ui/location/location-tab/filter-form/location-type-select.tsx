'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { LocationTypeOptions } from '../../constant'
import { transformInOptions } from '../transform'

const LocationTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Location Type</FormFieldLabel>
      <SelectInput
        field="locationType"
        options={transformInOptions(LocationTypeOptions)}
        size="1"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { LocationTypeSelect }
