'use client'

import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore as globalStore } from '@/store'
import { getPatientMedicationOrderAction } from '../actions'
import { AddMedicationButton } from '../add-medication-button'
import { PatientMedicationIframe } from '../patient-medication-iframe'
import { useStore } from '../store'
import { PatientMedication, PatientPrescriptionStatus } from '../types'

interface RowActionRefreshProps {
  row: Row<PatientMedication>
  onEditClick: (
    medication: PatientMedication,
    options?: { rePrescribe?: boolean },
  ) => void
}

const RowActionRefresh = ({ row, onEditClick }: RowActionRefreshProps) => {
  const { prescriptionStatusTypeId, medicationStatus } = row.original
  const { original: record } = row
  const patientId = useParams().id as string

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const isDisabled = !isFeatureFlagEnabled
    ? medicationStatus !== 'Active'
    : prescriptionStatusTypeId?.toString() !== PatientPrescriptionStatus.ACTIVE

  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')
  const { refetch, scriptSureSessionToken } = useStore()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [iframeUrl, setIframeUrl] = useState<string>('')
  const { constant } = globalStore((state) => ({
    constant: state.constants,
  }))

  const onRefresh = async () => {
    if (!isFeatureFlagEnabled) {
      onEditClick(record, { rePrescribe: true })
      return
    }
    setIsLoading(true)
    const result = await getPatientMedicationOrderAction({
      patientId,
      prescriptionId: record.externalPrescriptionId,
    })

    if (result.state === 'success') {
      const { pendingOrderId, externalPatientId } = result.data
      const iframeUrl = `${constant.scriptsureBaseApplicationUrl}/widgets/prescription/${externalPatientId}/${pendingOrderId}?sessiontoken=${scriptSureSessionToken}&darkmode=off`
      setIframeUrl(iframeUrl)
      setIsOpen(true)
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to load')
    }
    setIsLoading(false)
  }

  const refreshMedications = () => {
    refetch(isQuickNoteSection)
  }

  return (
    <>
      <Tooltip content="Re-Prescribe">
        <IconButton
          size="1"
          color="gray"
          variant="ghost"
          onClick={onRefresh}
          disabled={isLoading || isDisabled}
        >
          <RefreshCw size={18} color="black" />
        </IconButton>
      </Tooltip>
      <Dialog.Root open={isOpen}>
        <Dialog.Content className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
          <Flex justify="between" align="center" mb="2">
            <Dialog.Title
              size="5"
              weight="bold"
              className="text-black m-0 font-sans"
            >
              Add Medication
            </Dialog.Title>
            <Dialog.Close
              className="cursor-pointer"
              onClick={refreshMedications}
            >
              <Cross2Icon />
            </Dialog.Close>
          </Flex>
          {!isFeatureFlagEnabled ? (
            <AddMedicationButton />
          ) : (
            iframeUrl && <PatientMedicationIframe iframeSrc={iframeUrl} />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export { RowActionRefresh }
