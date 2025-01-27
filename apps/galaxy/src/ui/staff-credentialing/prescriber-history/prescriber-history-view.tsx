'use client'

import { PropsWithChildren } from 'react'
import { Dialog } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PrescriberDataResponse } from '../types'
import { PrescriberHistoryTable } from './components/prescriber-history-table'

const PrescriberHistoryDialog = ({
  row,
  children,
}: PropsWithChildren<PropsWithRow<PrescriberDataResponse>>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Prescriber History for {row.original.stateName}
        </Dialog.Title>
        <PrescriberHistoryTable />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PrescriberHistoryDialog }
