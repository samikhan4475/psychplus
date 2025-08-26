'use client'

import React, { useEffect, useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { PlusIcon, RefreshCcw } from 'lucide-react'
import { SignIcon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PermissionAlert } from '@/ui/schedule/shared'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { Step } from './patient-medication-dialog/types'
import { ScriptSureMedicationDialog } from './script-sure-medication-dialog'
import { useStore } from './store'
import { PatientMedication } from './types'

const DEFAULT_ADD_ALERT_MESSAGE =
  'You do not have permission to Add. Please contact your supervisor if you need any further assistance.'
const DEFAULT_SIGN_ALERT_MESSAGE =
  'You do not have permission to Sign. Please contact your supervisor if you need any further assistance.'
const AddMedicationButton = ({ onRefresh }: { onRefresh?: () => void }) => {
  const loading = useStore((s) => s.loading)
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )

  const { data, selectedMedicationIds } = useStore((s) => ({
    data: s.data,
    selectedMedicationIds: s.selectedMedicationIds,
  }))

  const [open, setOpen] = useState(false)
  const [initialStep, setInitialStep] = useState<Step | undefined>(undefined)
  const [selectedMedication, setSelectedMedication] = useState<
    PatientMedication | undefined
  >(undefined)
  const [alertMessage, setAlertMessage] = useState(DEFAULT_ADD_ALERT_MESSAGE)
  const signMedication = useHasPermission('signMedication')
  const addMedication = useHasPermission('addMedication')
  const [openAlert, setOpenAlert] = useState(false)

  const handleOpenSign = () => {
    if (!signMedication) {
      setAlertMessage(DEFAULT_SIGN_ALERT_MESSAGE)
      setOpenAlert(true)
      return
    }
    if (!selectedMedication) return
    setInitialStep(Step.Review)
    setOpen(true)
  }

  const handleOpenAdd = () => {
    if (!addMedication) {
      setAlertMessage(DEFAULT_ADD_ALERT_MESSAGE)
      setOpenAlert(true)
      return
    }
    setSelectedMedication(undefined)
    setOpen(true)
    useStore.setState({ selectedMedicationIds: [],hasControlledMedication:false })
  }

  useEffect(() => {
    const firstId = selectedMedicationIds?.[0]
    if (firstId) {
      const medication = data?.find((m) => m.id === firstId)
      setSelectedMedication(medication)
    }
  }, [selectedMedicationIds, data])
  if (!isFeatureFlagEnabled) {
    return (
      <Flex align="center" gap="1">
        <Button
          className="h-6 bg-[#151B4A] text-[12px] text-[#FFF]"
          disabled={!selectedMedication}
          onClick={handleOpenSign}
        >
          <SignIcon />
          Sign
        </Button>

        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
          disabled={loading}
          onClick={onRefresh}
        >
          <RefreshCcw className="text-pp-gray-3" width="16px" height="16px" />
        </Button>
        <Button
          size="1"
          variant="outline"
          color="gray"
          className="text-black"
          onClick={handleOpenAdd}
        >
          <PlusIcon height={16} width={16} />
          Add
        </Button>

        <PatientMedicationDialog
          title="Add Medication"
          medication={selectedMedication ?? undefined}
          open={open}
          initialStep={initialStep}
          onOpenChange={(open) => {
            if (!open) setSelectedMedication(undefined)
            setOpen(open)
          }}
        />
        <PermissionAlert
          isOpen={openAlert}
          onClose={() => setOpenAlert(false)}
          message={alertMessage}
        />
      </Flex>
    )
  }
  return (
    <ScriptSureMedicationDialog title="Add Medication">
      <Dialog.Trigger>
        <Button size="1" variant="outline" color="gray" className="text-black">
          <PlusIcon height={16} width={16} />
          Add New
        </Button>
      </Dialog.Trigger>
    </ScriptSureMedicationDialog>
  )
}

export { AddMedicationButton }
