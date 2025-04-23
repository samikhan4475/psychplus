import React from 'react'
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
  if (!isFeatureFlagEnabled) {
    return (
      <PatientMedicationDialog title="Add Medication">
        <Dialog.Trigger>
          <Button
            size="1"
            variant="outline"
            color="gray"
            className="text-black"
          >
            <PlusIcon height={16} width={16} />
            Add New
          </Button>
        </Dialog.Trigger>
      </PatientMedicationDialog>
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
