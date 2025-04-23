'use client'

import { Fragment, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore as globalStore } from '@/store'
import { getPatientMedicationOrderAction } from '../actions'
import { PatientMedicationDialog } from '../patient-medication-dialog'
import { ScriptSureIframeDialog } from '../script-sure-iframe-dialog'
import { useStore } from '../store'
import { PatientMedication, PatientPrescriptionStatus } from '../types'

const RowActionEdit = ({ row }: PropsWithRow<PatientMedication>) => {
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

  const isDisabled = useMemo(
    () =>
      prescriptionStatusTypeId?.toString() !== PatientPrescriptionStatus.ACTIVE,
    [prescriptionStatusTypeId],
  )
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
      <PatientMedicationDialog
        title="Edit Medication"
        medication={row.original}
      >
        <Dialog.Trigger>
          <Tooltip content="Edit">
            <IconButton size="1" color="gray" variant="ghost" type="button">
              <RefreshCw size={18} color="black" />
            </IconButton>
          </Tooltip>
        </Dialog.Trigger>
      </PatientMedicationDialog>
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
          <RefreshCw size={18} color="black" />
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
