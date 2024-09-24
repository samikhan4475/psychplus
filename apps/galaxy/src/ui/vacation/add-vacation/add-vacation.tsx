'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddVacationForm } from './components'

interface AddVacationProps {
  staffId: string
}

const AddVacation = ({
  children,
  staffId,
}: PropsWithChildren<AddVacationProps>) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={(open) => {
        setIsOpenDialog(open)
      }}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Vacations
        </Dialog.Title>

        <AddVacationForm staffId={staffId} setIsOpenDialog={setIsOpenDialog} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVacation }
