'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const StatusSelect = () => {
  const option = useCodesetOptions(CODESETS.RecordStatus, undefined, [
    'Deleted',
    'Archived',
  ])
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="recordStatuses"
        options={transformInOptions(option)}
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
