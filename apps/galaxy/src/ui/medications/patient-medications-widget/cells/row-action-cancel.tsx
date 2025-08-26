'use client'

import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { CircleX } from 'lucide-react'
import toast from 'react-hot-toast'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cancelPatientPrescriptions } from '../actions'
import { cancelNonFeatureFlagPrescriptions } from '../actions/cancel-non-feature-flag-prescription'
import { ConfirmationDialog } from '../dialog/confirmation-dialog'
import { useStore } from '../store'
import { PatientMedication, PatientPrescriptionStatus } from '../types'

interface RowActionRefreshProps {
  row: Row<PatientMedication>
}
const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Cancel. Please contact your supervisor if you need any further assistance.'

const RowActionCancel = ({ row }: RowActionRefreshProps) => {
  const {
    id,
    externalPrescriptionId,
    externalMessageId,
    writtenDate,
    prescriptionStatusTypeId,
  } = row.original
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const { externalPatientId, refetch } = useStore((state) => ({
    externalPatientId: state.externalPatientId,
    refetch: state.refetch,
  }))
  const cancelMedication = useHasPermission('cancelMedication')

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const isDisabled =
    prescriptionStatusTypeId?.toString() ===
      PatientPrescriptionStatus.AWAITING_APPROVAL ||
    prescriptionStatusTypeId?.toString() === PatientPrescriptionStatus.CANCELLED

  const patientId = useParams().id as string
  const [isLoading, setIsLoading] = useState(false)

  const onCancel = async () => {
    setIsLoading(true)
    setOpen(false)
    let result

    if (!isFeatureFlagEnabled) {
      result = await cancelNonFeatureFlagPrescriptions({
        prescriptionId: id,
      })
    } else {
      if (!externalPatientId) {
        setIsLoading(false)
        return
      }

      result = await cancelPatientPrescriptions({
        patientId,
        externalPatientId,
        externalPrescriptionId,
        externalMessageId,
        writtenDate,
      })
    }

    if (result?.state === 'error') {
      toast.error(result.error)
      setIsLoading(false)
      return
    }
    toast.success('Cancelled Successfully')
    setIsLoading(false)
    refetch(isQuickNoteSection)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = isFeatureFlagEnabled
    ? onCancel
    : () => {
        if (!cancelMedication) {
          setOpenAlert(true)
          return
        }
        setOpen(true)
      }

  return (
    <>
      <Tooltip content="Cancel">
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={handleClick}
          disabled={isDisabled || isLoading}
        >
          <CircleX size={18} color="black" />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        isOpen={open}
        closeDialog={handleClose}
        onConfirmation={onCancel}
        heading={'Do you want to cancel this prescription?'}
      />
      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message={DEFAULT_ALERT_MESSAGE}
      />
    </>
  )
}

export { RowActionCancel }
