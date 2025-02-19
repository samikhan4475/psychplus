'use client'

import { Dialog, IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { VacationTime } from './types'
import { VacationDialog } from './vacation-dialog'

interface EditVacationButtonProps {
  vacation: VacationTime
}
const EditVacationButton = ({ vacation }: EditVacationButtonProps) => {
  return (
    <VacationDialog
      title="Edit Vacation"
      staffId={String(vacation.staffId)}
      vacation={vacation}
    >
      <Dialog.Trigger>
        <IconButton
          variant="ghost"
          className="!m-0"
          size="1"
          color="gray"
          highContrast
        >
          <TableEditIcon width={16} height={16} />
        </IconButton>
      </Dialog.Trigger>
    </VacationDialog>
  )
}

export { EditVacationButton }
