'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { CheckCircle } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PermissionAlert } from '@/ui/schedule/shared'
import { Step } from '../patient-medication-dialog/types'
import { PatientMedication } from '../types'

interface RowActionApproveProps extends PropsWithRow<PatientMedication> {
  onEditClick: (
    medication: PatientMedication,
    options?: { rePrescribe?: boolean },
    step?: Step,
  ) => void
}

const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Sign. Please contact your supervisor if you need any further assistance.'

const RowActionApprove = ({ row, onEditClick }: RowActionApproveProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const signMedication = useHasPermission('signMedication')
  const [openAlert, setOpenAlert] = useState(false)

  if (!isFeatureFlagEnabled) {
    return (
      <>
        <Tooltip content="Sign">
          <IconButton
            size="1"
            color="gray"
            variant="ghost"
            onClick={() => {
              if (!signMedication) {
                setOpenAlert(true)
                return
              }
              onEditClick(row.original, { rePrescribe: false }, Step.Review)
            }}
          >
            <CheckCircle size={18} />
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
}

export { RowActionApprove }
