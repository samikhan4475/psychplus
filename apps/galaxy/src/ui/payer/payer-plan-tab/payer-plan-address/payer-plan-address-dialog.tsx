'use client'

import { useState } from 'react'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PayerPlanAddressResponse } from '@/types'
import { useStore } from '../store'
import { PayerPlanAddressForm } from './payer-plan-address-form'

interface PayerPlanAddressFormProps {
  isEditMode: boolean
  data?: PayerPlanAddressResponse | null
  payerId: string
}

const PayerPlanAddressDialog = ({
  isEditMode,
  data,
  payerId,
}: PayerPlanAddressFormProps) => {
  const { searchAddress } = useStore((state) => ({
    searchAddress: state.searchAddress,
  }))
  const [open, setOpen] = useState(false)

  const states = useCodesetCodes(CODESETS.UsStates)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      searchAddress(payerId, states)
    }
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {isEditMode ? (
          <IconButton variant="ghost">
            <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
          </IconButton>
        ) : (
          <Button size="1" className=" text-[#000000] bg-[#ffffff] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]">
            <PlusIcon /> Add New
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[900px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {isEditMode ? 'Edit' : 'Add'} Plan Address
        </Dialog.Title>
        <PayerPlanAddressForm
          data={data}
          isEditMode={isEditMode}
          payerId={payerId}
          onCloseModal={onOpenChange}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PayerPlanAddressDialog }
