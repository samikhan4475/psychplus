'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { NewPatient } from '@/types'
import { AddPatientForm } from './components'

const AddPatient = ({
  onPatientAdd = () => null,
  children,
}: PropsWithChildren<{
  onPatientAdd?: (data: NewPatient) => void
}>) => {
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
          Add User
        </Dialog.Title>

        <AddPatientForm
          onPatientAdd={(data: NewPatient) => {
            onPatientAdd(data)
            setIsOpenDialog(false)
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPatient }
