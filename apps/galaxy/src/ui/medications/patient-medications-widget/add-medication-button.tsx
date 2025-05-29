import React, { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { ScriptSureMedicationDialog } from './script-sure-medication-dialog'

const AddMedicationButton = () => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  if (!isFeatureFlagEnabled) {
    return (
      <>
        <Button
          size="1"
          variant="outline"
          color="gray"
          className="text-black"
          onClick={handleOpen}
        >
          <PlusIcon height={16} width={16} />
          Add New
        </Button>
        <PatientMedicationDialog
          title="Add Medication"
          medication={undefined}
          open={open}
          onOpenChange={(open) => {
            if (!open) handleClose()
          }}
        />
      </>
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
