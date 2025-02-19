'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getActiveVisitStatusOptions } from '../utils'

const StatusSelect = () => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)

  return (
    <FormFieldContainer className="flex-1 gap-0.5">
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <DropdownSelect
        options={getActiveVisitStatusOptions(codes)}
        field="appointmentStatus"
        placeholder="Status"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
