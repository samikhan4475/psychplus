'use client'

import { useState } from 'react'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { InsurancePayment } from '../../types'
import { InsurancePaymentForm } from './insurance-payment-form'

interface DialogProps {
  data?: InsurancePayment | null
}

const InsurancePaymentDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {data ? (
          <IconButton size="1" color="gray" variant="ghost">
            <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />{' '}
          </IconButton>
        ) : (
          <Button
            size="1"
            className="bg-pp-black-1 text-white h-[25px] flex-1 cursor-pointer px-3 py-1.5"
          >
            <PlusIcon /> Add
          </Button>
        )}
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'Add'} Insurance Payment
        </Dialog.Title>

        <InsurancePaymentForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { InsurancePaymentDialog }
