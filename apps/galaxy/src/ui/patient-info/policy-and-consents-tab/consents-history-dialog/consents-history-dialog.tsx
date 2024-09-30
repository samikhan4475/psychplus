import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ActionItem } from '../cells/action-item'
import { RowActionProps } from '../types'
import { HistoryDataTable } from './history-table'

const ConsentsHistoryDialog = ({
  row: {
    original: { consents, type },
  },
  id,
  disabled,
}: RowActionProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <ActionItem
          Icon={CounterClockwiseClockIcon}
          title={id}
          disabled={disabled}
        />
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[630px] rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title>{type} History</Dialog.Title>
        <HistoryDataTable consents={consents ?? []} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConsentsHistoryDialog }
