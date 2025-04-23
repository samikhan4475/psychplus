'use client'

import React from 'react'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { ScriptSureMedicationDialog } from './script-sure-medication-dialog'
import { PatientMedication } from './types'

const EditMedicationButton = ({ row }: PropsWithRow<PatientMedication>) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  if (!isFeatureFlagEnabled) {
    return (
      <PatientMedicationDialog
        title="Edit Medication"
        medication={row.original}
      >
        <Tooltip content="Edit Medication">
          <Dialog.Trigger>
            <IconButton size="1" color="gray" variant="ghost" highContrast>
              <Edit2Icon width={16} height={16} />
            </IconButton>
          </Dialog.Trigger>
        </Tooltip>
      </PatientMedicationDialog>
    )
  }

  return (
    <ScriptSureMedicationDialog title="Edit Medication">
      <Dialog.Trigger>
        <Tooltip content="Edit Medication">
          <IconButton size="1" color="gray" variant="ghost" highContrast>
            <Edit2Icon width={16} height={16} />
          </IconButton>
        </Tooltip>
      </Dialog.Trigger>
    </ScriptSureMedicationDialog>
  )
}

export { EditMedicationButton }
