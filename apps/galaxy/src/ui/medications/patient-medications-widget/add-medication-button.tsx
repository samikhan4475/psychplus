import React, { useState } from 'react'
import { Button, Dialog, Text, Flex } from '@radix-ui/themes'
import { PlusIcon, RefreshCcw } from 'lucide-react'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { ScriptSureMedicationDialog } from './script-sure-medication-dialog'
import { useStore } from './store'

const AddMedicationButton = ({ onRefresh }: { onRefresh?: () => void }) => {
  const loading = useStore((state) => state.loading)

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  if (!isFeatureFlagEnabled) {
    return (
      <Flex align="center" gap="1">
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
          onClick={handleOpen}
        >
          <PlusIcon height={16} width={16} />
          Add
        </Button>
        <PatientMedicationDialog
          title="Add Medication"
          medication={undefined}
          open={open}
          onOpenChange={(open) => {
            if (!open) handleClose()
          }}
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
