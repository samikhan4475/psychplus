'use client'

import { useMemo } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'

const VisitTypeSelect = () => {
  const visitTypes = useCodesetOptions(CODESETS.VisitType)
  const options = useMemo(
    () => visitTypes?.map(({ label }) => ({ label, value: label })),
    [visitTypes],
  )
  return (
    <FormFieldContainer className="flex-row">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitTypeName"
        options={transformInOptions(options)}
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
