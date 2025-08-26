'use client'

import { Fragment, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { EditIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore as globalStore } from '@/store'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getPatientMedicationOrderAction } from '../actions'
import { ScriptSureIframeDialog } from '../script-sure-iframe-dialog'
import { useStore } from '../store'
import { PatientMedication, PatientPrescriptionStatus } from '../types'

interface RowActionEditProps extends PropsWithRow<PatientMedication> {
  onEditClick: (medication: PatientMedication) => void
}
const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Edit. Please contact your supervisor if you need any further assistance.'

const RowActionEdit = ({ row, onEditClick }: RowActionEditProps) => {
  const { prescriptionStatusTypeId, externalPrescriptionId: prescriptionId } =
    row.original
  const { id: patientId = '' } = useParams<{ id: string }>()
  const scriptSureSessionToken = useStore(
    (state) => state.scriptSureSessionToken,
  )
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [iframeUrl, setIframeUrl] = useState<string>('')
  const { constant } = globalStore((state) => ({
    constant: state.constants,
  }))
  const editMedication = useHasPermission('editMedication')
  const [openAlert, setOpenAlert] = useState(false)

  const transactionStatus = row.original.userTransactionStatus?.toLowerCase()
  const isTransactionBlocked =
    transactionStatus === 'success' || transactionStatus === 'pending'

  const isPrescriptionNotActive =
    prescriptionStatusTypeId?.toString() !== PatientPrescriptionStatus.ACTIVE

  const isDisabled = useMemo(() => {
    return isFeatureFlagEnabled ? isPrescriptionNotActive : isTransactionBlocked
  }, [isFeatureFlagEnabled, isPrescriptionNotActive, isTransactionBlocked])

  const onRefresh = async () => {
    setIsLoading(true)
    const result = await getPatientMedicationOrderAction({
      patientId,
      prescriptionId,
    })
    if (result.state === 'error') {
      setIsLoading(false)
      return toast.error(result.error ?? 'Failed to load')
    }
    const { pendingOrderId, externalPatientId } = result.data
    const iframeUrl = `${constant.scriptsureBaseApplicationUrl}/widgets/prescription/${externalPatientId}/${pendingOrderId}?sessiontoken=${scriptSureSessionToken}&darkmode=off`
    setIframeUrl(iframeUrl)
    setIsOpen(true)
    setIsLoading(false)
  }
  if (!isFeatureFlagEnabled) {
    return (
      <>
        <Tooltip content="Edit">
          <IconButton
            size="1"
            color="gray"
            variant="ghost"
            onClick={() => {
              if (!editMedication) {
                setOpenAlert(true)
                return
              }
              onEditClick(row.original)
            }}
            disabled={isDisabled}
          >
            <EditIcon size={18} color="black" />
          </IconButton>
        </Tooltip>
        <PermissionAlert
          isOpen={openAlert}
          onClose={() => setOpenAlert(false)}
          message={DEFAULT_ALERT_MESSAGE}
        />
      </>
    )
  }

  return (
    <Fragment>
      <Tooltip content="Edit">
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={onRefresh}
          disabled={isDisabled}
        >
          <EditIcon size={18} color="black" />
        </IconButton>
      </Tooltip>
      <ScriptSureIframeDialog
        iframeUrl={iframeUrl}
        isLoading={isLoading}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
        title="Edit Medication"
      />
    </Fragment>
  )
}

export { RowActionEdit }
