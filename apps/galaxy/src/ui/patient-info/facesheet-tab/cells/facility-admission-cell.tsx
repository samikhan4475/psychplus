'use client'

import { useState } from 'react'
import { SelectCell } from '@/components'

interface FacilityAdmissionIdCellProps {
  facilityAdmissionId: string
  patientVisits: {
    facilityAdmissionId: number
    facilityAdmissionDetailId: string
  }[]
}

const FacilityAdmissionIdCell = ({
  facilityAdmissionId,
  patientVisits,
}: FacilityAdmissionIdCellProps) => {
  const matchedVisit = patientVisits.find(
    (visit) => visit.facilityAdmissionDetailId === facilityAdmissionId,
  )
  const initialId = matchedVisit
    ? matchedVisit.facilityAdmissionId?.toString()
    : facilityAdmissionId
  const [selectedFacilityAdmissionId, setSelectedFacilityAdmissionId] =
    useState(initialId)

  return (
    <SelectCell
      value={selectedFacilityAdmissionId}
      onValueChange={setSelectedFacilityAdmissionId}
      disabled
      options={[
        {
          label: initialId,
          value: initialId,
        },
      ]}
    />
  )
}

export { FacilityAdmissionIdCell }
