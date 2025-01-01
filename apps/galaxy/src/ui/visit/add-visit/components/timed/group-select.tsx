'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'

const GroupTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [groupTypeOptions, setGroupTypeOptions] = useState<SelectOptionType[]>(
    [],
  )
  const codes = useCodesetCodes(CODESETS.GroupTherapyType)
  const { visitTypes } = useAddVisitStore()

  const [visitTypeId, showGroupTypeField] = useWatch({
    control: form.control,
    name: ['visitType', 'showGroupTypeField'],
  })

  useEffect(() => {
    if (visitTypeId) {
      const visitType = visitTypes.find(
        (type) => type.encouterType === visitTypeId,
      )
      if (visitType) {
        const isGroupVisit = visitType.visitTypeCode === 'GroupTherapy'
        form.setValue('showGroupTypeField', isGroupVisit)
        setGroupTypeOptions(
          codes.map((visitType) => ({
            label: visitType.display,
            value: visitType.value,
          })),
        )
      }
    } else if (!visitTypeId && showGroupTypeField) {
      form.setValue('showGroupTypeField', false)
    }
    return () => form.setValue('showGroupTypeField', false)
  }, [visitTypeId, visitTypes])

  if (!showGroupTypeField) return null

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Group Type</FormFieldLabel>
      <SelectInput
        field="groupType"
        options={groupTypeOptions}
        buttonClassName="h-6 w-full"
        disabled={!visitTypeId}
      />
      <FormFieldError name="groupType" />
    </FormFieldContainer>
  )
}

export { GroupTypeDropdown }
