'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { SelectCell } from '@/components'
import { Facesheet, SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'
import { updateFacesheetAction } from '../actions'

interface VisitOptionType extends SelectOptionType {
  details: {
    appointmentId: number
    appointmentEncounterNo: string
    facilityAdmissionDetailId: string
  }
}

interface VisitIdCellProps {
  visit: Facesheet
  patientVisits: {
    appointmentId: number
    appointmentEncounterNo: string
    facilityAdmissionDetailId: string
  }[]
  onVisitSelect: (facesheet: Facesheet) => void
}

const VisitIdCell = ({
  visit,
  patientVisits,
  onVisitSelect,
}: VisitIdCellProps) => {
  const [selectedVisitId, setSelectedVisitId] = useState<string>(
    visit.appointmentId?.toString(),
  )

  const options: VisitOptionType[] = patientVisits.map((visit) => ({
    label: visit.appointmentEncounterNo,
    value: visit.appointmentId.toString(),
    details: visit,
  }))

  const handleValueChange = async (value: string) => {
    setSelectedVisitId(value)
    const selectedOption = options.find((option) => option.value === value)
    if (selectedOption) {
      const updatedVisit = {
        ...visit,
        ...selectedOption.details,
        facilityAdmissionId: selectedOption.details.facilityAdmissionDetailId,
      }
      const payload = {
        recordStatus: updatedVisit.recordStatus,
        patientId: updatedVisit.patientId,
        isHasFaceSheetDocument: true,
        appointmentId: updatedVisit.appointmentId,
        facilityAdmissionId: updatedVisit.facilityAdmissionId,
      }
      const res = await updateFacesheetAction({
        patientId: updatedVisit.patientId,
        facesheetId: updatedVisit.id,
        payload: sanitizeFormData(payload),
      })
      if (res.state === 'error') {
        toast.error(res.error)
      } else {
        onVisitSelect(updatedVisit)
        toast.success('Visit ID updated successfully!')
      }
    }
  }

  return (
    <SelectCell
      value={selectedVisitId}
      onValueChange={handleValueChange}
      options={options}
    />
  )
}

export { VisitIdCell }
