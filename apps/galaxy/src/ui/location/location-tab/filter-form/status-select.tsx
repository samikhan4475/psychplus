'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const StatusSelect = () => {
  const options = useCodesetOptions(CODESETS.RecordStatus)
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="recordStatuses"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
