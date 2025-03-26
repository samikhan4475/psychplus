'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ShuffelIcon } from '@/components/icons'
import { LinkAccountForm } from './filters/link-account-form'
import { AddLinkAccountTable } from './table'

interface AddAccountLinkDialogProps {
  patientId: string
  onCloseModal: (open: boolean) => void
}
const AddAccountLink = ({
  patientId,
  onCloseModal,
}: AddAccountLinkDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleCloseModal = (openDialog: boolean) => {
    setOpenDialog(openDialog)
    onCloseModal(true)
  }
  return (
    <Dialog.Root open={openDialog} onOpenChange={handleCloseModal}>
      <Dialog.Trigger>
        <Button
          color="gray"
          className="text-black bg-white disabled:!bg-pp-gray-2"
          size="1"
          variant="surface"
        >
          <ShuffelIcon /> Link Account
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative w-[1500px] max-w-full !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Link Account
        </Dialog.Title>
        <LinkAccountForm />
        <AddLinkAccountTable patientId={patientId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddAccountLink }
