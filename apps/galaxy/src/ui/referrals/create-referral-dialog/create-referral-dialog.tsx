'use client'

import { useState } from 'react'
import { Button, Dialog, Flex, Separator } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { FormSection } from './form-section'

interface CreateReferralDialogProps {
  patientId: string
  appointmentId?:string
  onClose?: () => void
}

const CreateReferralDialog = ({
  patientId,
  onClose,
  appointmentId
}: CreateReferralDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>
        <Button
          size="1"
          color="gray"
          type="button"
          variant="outline"
          className="text-black"
        >
          <Plus size={14} /> Add
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-[470px] rounded-2 p-6">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="medium">
            Create Referral
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <Separator
          className="border-pp-grey mb-4 w-full"
          orientation="horizontal"
        />
        <FormSection
          patientId={patientId}
          appointmentId={appointmentId}
          onClose={onClose}
          handleCloseDialog={handleClose}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CreateReferralDialog }
