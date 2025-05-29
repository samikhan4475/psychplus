'use client'

import React from 'react'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { ScriptSureMedicationDialog } from './script-sure-medication-dialog'
import { PatientMedication } from './types'
import { EditIcon } from 'lucide-react'
interface RowActionEditProps extends PropsWithRow<PatientMedication> {
  onEditClick: (medication: PatientMedication) => void
}
const EditMedicationButton = ({ row, onEditClick }: RowActionEditProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  if (!isFeatureFlagEnabled) {
    return (
      <Tooltip content="Edit">
           <IconButton
             size="1"
             color="gray"
             variant="ghost"
             onClick={() => onEditClick(row.original)}
           >
             <EditIcon size={18} color="black" />
           </IconButton>
         </Tooltip>
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
