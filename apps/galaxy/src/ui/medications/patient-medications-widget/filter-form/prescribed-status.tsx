'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const PrescribedStatus = () => {
  const options = useCodesetOptions(CODESETS.PrescribedStatus)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Prescriber Status</FormFieldLabel>
      <SelectInput
        field="recordStatuses"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="border-pp-gray-2 h-6 w-[120px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PrescribedStatus }
