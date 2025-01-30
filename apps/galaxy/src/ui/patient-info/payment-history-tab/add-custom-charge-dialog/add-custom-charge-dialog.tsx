'use client'

import React, { PropsWithChildren, useState } from 'react'
import { Dialog, IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PatientTransaction } from '../types'
import { CustomChargeForm } from './custom-charge-form'

interface Props {
  patientId: string
  onClose?: () => void
  unappliedAmount?: string
  transaction?: PatientTransaction
}

const AddCustomChargeDialog = ({
  patientId,
  children,
  onClose,
  unappliedAmount,
  transaction,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[690px] rounded-2 p-4">
        <Dialog.Close className="absolute right-4 top-3">
          <IconButton color="gray" size="1" variant="ghost" className="!m-0">
            <X size={18} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title size="5" weight="medium">
          Charge/Modified Entry
        </Dialog.Title>
        <CustomChargeForm
          patientId={patientId}
          onClose={handleClose}
          unappliedAmount={unappliedAmount}
          transaction={transaction}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCustomChargeDialog }
