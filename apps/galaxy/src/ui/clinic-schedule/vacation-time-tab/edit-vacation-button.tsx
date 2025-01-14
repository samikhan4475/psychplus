'use client'

import { Dialog, IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { VacationDialog } from './vacation-dialog'

const EditVacationButton = () => {
  return (
    <VacationDialog title="Edit Vacation">
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <TableEditIcon width={16} height={16} />
        </IconButton>
      </Dialog.Trigger>
    </VacationDialog>
  )
}

export { EditVacationButton }
