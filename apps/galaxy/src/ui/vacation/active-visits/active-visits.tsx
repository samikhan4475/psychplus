'use client'

import { PropsWithChildren } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ActiveVisitsList } from './components/active-visits-list'

interface ActiveVisitsProps {
  staffId: string
  startDate: string
  endDate: string
  isOpen: boolean
  closeDialog: () => void
}

const ActiveVisits = ({
  staffId,
  startDate,
  endDate,
  isOpen,
  closeDialog,
}: PropsWithChildren<ActiveVisitsProps>) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        closeDialog()
      }}
    >
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Active Visits
        </Dialog.Title>

        <ActiveVisitsList
          staffId={staffId}
          startDate={startDate}
          endDate={endDate}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActiveVisits }
