'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
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
  const { externalPatientId, data, updateStatus } =
    useStore((state) => ({
      externalPatientId: state.externalPatientId,
      data: state.data,
      updateStatus: state.updateStatus,
    }))

  const disabled =
    prescriptionStatusTypeId?.toString() === PatientPrescriptionStatus.AWAITING_APPROVAL
  const patientId = useParams().id as string
  const [isLoading, setIsLoading] = useState(false)
  const onCancel = async () => {
    setIsLoading(true)
    if (externalPatientId) {
      const result = await cancelPatientPrescriptions({
        patientId,
        externalPatientId,
        externalPrescriptionId,
        externalMessageId,
        writtenDate,
      })

      if (result.state === 'success') {
        toast.success('Prescription  Cancelled Successfully')
        if (data) {
          const updatedData = {
            ...data,
            medications: data.medications.filter(
              (med) => med.externalPrescriptionId !== externalPrescriptionId,
            ),
          }
          updateStatus(updatedData) 
        }
        return
      } else if (result.state === 'error') {
        toast.error('Unable to Cancel Prescription')
      }
      setIsLoading(false)
    }
  }

  return (
    <>
      <Tooltip content="Cancel">
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={onCancel}
          disabled={disabled || isLoading}
        >
          <CircleX size={18} color="black" />
        </IconButton>
      </Tooltip>
    </>
  )
}

export { RowActionCancel }
