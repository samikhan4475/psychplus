'use client'

import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { CircleX } from 'lucide-react'
import toast from 'react-hot-toast'
import { cancelPatientPrescriptions } from '../actions'
import { useStore } from '../store'
import { PatientMedication, PatientPrescriptionStatus } from '../types'

interface RowActionRefreshProps {
  row: Row<PatientMedication>
}

const RowActionCancel = ({ row }: RowActionRefreshProps) => {
  const {
    externalPrescriptionId,
    externalMessageId,
    writtenDate,
    prescriptionStatusTypeId,
  } = row.original
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')

  const { externalPatientId, fetchPatientMedications } =
    useStore((state) => ({
      externalPatientId: state.externalPatientId,
      fetchPatientMedications: state.fetchPatientMedications
    }))

  const isDisabled =
    prescriptionStatusTypeId?.toString() === PatientPrescriptionStatus.AWAITING_APPROVAL ||
    prescriptionStatusTypeId?.toString() === PatientPrescriptionStatus.CANCELLED;

  const patientId = useParams().id as string
  const [isLoading, setIsLoading] = useState(false)

  const onCancel = async () => {
    if (!externalPatientId) return;
    setIsLoading(true)
    const result = await cancelPatientPrescriptions({
      patientId,
      externalPatientId,
      externalPrescriptionId,
      externalMessageId,
      writtenDate,
    })
    if (result.state === 'success') {
      toast.success('Prescription cancelled successfully.')
      fetchPatientMedications(patientId, isQuickNoteSection)
    } else if (result.state === 'error') {
      toast.error('Unable to cancel prescription.')
    }
    setIsLoading(false)
  }

  return (
    <Tooltip content="Cancel">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={onCancel}
        disabled={isDisabled || isLoading}
      >
        <CircleX size={18} color="black" />
      </IconButton>
    </Tooltip>
  )
}

export { RowActionCancel }
