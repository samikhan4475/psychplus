'use client'

import { Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { RefreshCw } from 'lucide-react'
import { PatientMedication } from '../types'
import { getPatientMedicationOrderAction } from '../actions'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FEATURE_FLAGS } from '@/constants'
import { useStore } from '../store'
import { AddMedication } from '../../add-medication'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useGetOrderIdScriptSureIframeUrl } from '../get-orderid-script-sure-iframe-url'
import { Row } from '@tanstack/react-table'
import { PatientMedicationIframe } from '../patient-medication-iframe'

interface RowActionRefreshProps {
  row: Row<PatientMedication>
  scriptSureAppUrl: string
}

const RowActionRefresh = ({
  row,
  scriptSureAppUrl
}: RowActionRefreshProps) => {
  const { original: record } = row
  const patientId = useParams().id as string
  const [isLoading, setIsLoading] = useState(false)
  const [pendingOrderId, setPendingOrderId] = useState<number>()
  const [externalPatientId, setExternalPatientId] = useState<number>()
  const onRefresh = async () => {
    setIsLoading(true)
    const result = await getPatientMedicationOrderAction({
      patientId,
      prescriptionId: record.externalPrescriptionId
    })

    if (result.state === 'success') {
      const { pendingOrderId, externalPatientId } = result.data
      toast.success('Successfully loaded')
      setPendingOrderId(pendingOrderId)
      setExternalPatientId(externalPatientId)

    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to load')
    }
    setIsLoading(false)
  }
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const { fetchPatientMedications } = useStore();
  const fetchMedications = () => {
    fetchPatientMedications(patientId);
  };
  const { iframeUrl, isOpen } = useGetOrderIdScriptSureIframeUrl(
    patientId,
    pendingOrderId,
    externalPatientId,
    scriptSureAppUrl,
    'prescription',
  )

  return (
    <>
      <Tooltip content="Re-Prescribe">
        <IconButton size="1" color="gray" variant="ghost" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw size={18} color="black" />
        </IconButton>
      </Tooltip>
      <Dialog.Root open={isOpen}>
        <Dialog.Content
          className="relative max-h-[80vh] max-w-[60vw] overflow-y-scroll">
          <Flex justify="between" align="center" mb="2">
            <Dialog.Title
              size="5"
              weight="bold"
              className="text-black m-0 font-sans"
            >
              Add Medication
            </Dialog.Title>
            <Dialog.Close className="cursor-pointer" onClick={fetchMedications}>
              <Cross2Icon />
            </Dialog.Close>
          </Flex>
          {!isFeatureFlagEnabled ? (
            <AddMedication />
          ) : (
            iframeUrl && <PatientMedicationIframe iframeSrc={iframeUrl} />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export { RowActionRefresh }
