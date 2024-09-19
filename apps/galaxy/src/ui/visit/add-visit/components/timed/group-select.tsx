'use client'

import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'

const GroupTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [showGroupTypeField, setShowGroupTypeField] = useState<boolean>(false)
  const [groupTypeOptions, setGroupTypeOptions] = useState<
    { label: string; value: string }[]
  >([])
  const codes = useCodesetCodes(CODESETS.GroupTherapyType)
  const { visitTypes } = useAddVisitStore()

  const visitTypeId = form.watch('visitType')

  useEffect(() => {
    if (visitTypeId) {
      const visitType = visitTypes.find(
        (type) => type.encouterType === visitTypeId,
      )
      if (visitType) {
        setShowGroupTypeField(visitType.encouterType === 'Group Therapy')
        setGroupTypeOptions(
          codes.map((visitType) => ({
            label: visitType.display,
            value: visitType.value,
          })),
        )
      }
    } else if (!visitTypeId && showGroupTypeField) {
      setShowGroupTypeField(false)
    }
  }, [visitTypeId, visitTypes])

  if (!showGroupTypeField) return null

  return (
    <Box className="col-span-3">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>Group Type</FormFieldLabel>
        <SelectInput
          field="groupType"
          options={groupTypeOptions}
          buttonClassName="flex-1 w-full"
          disabled={!visitTypeId}
        />
        <FormFieldError name="groupType" />
      </FormFieldContainer>
    </Box>
  )
}

export { GroupTypeDropdown }
