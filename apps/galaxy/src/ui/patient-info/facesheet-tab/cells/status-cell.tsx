'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { SelectCell } from '@/components'
import { Facesheet, FacesheetRecordStatus, SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'
import { updateFacesheetAction } from '../actions'

const statusOptions: SelectOptionType[] = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'Deleted', value: 'Deleted' },
]

interface StatusCellProps {
  visit: Facesheet
  handleUpdateStatus: (facesheetId: string, status: string) => void
}

const StatusCell = ({ visit, handleUpdateStatus }: StatusCellProps) => {
  const [currentStatus, setCurrentStatus] = useState(visit.recordStatus)

  const handleStatusChange = async (value: string) => {
    setCurrentStatus(value as FacesheetRecordStatus)

    const payload = {
      recordStatus: value as FacesheetRecordStatus,
      patientId: visit.patientId,
      isHasFaceSheetDocument: true,
      appointmentId: visit.appointmentId,
      facilityAdmissionId: visit.facilityAdmissionId,
    }

    const res = await updateFacesheetAction({
      patientId: visit.patientId,
      facesheetId: visit.id,
      payload: sanitizeFormData(payload),
    })
    if (res.state === 'error') {
      toast.error(res.error)
    } else {
      handleUpdateStatus(visit.id, value)
      toast.success('Status updated successfully!')
    }
  }

  return (
    <SelectCell
      value={currentStatus}
      onValueChange={handleStatusChange}
      options={statusOptions}
    />
  )
}

export { StatusCell }
