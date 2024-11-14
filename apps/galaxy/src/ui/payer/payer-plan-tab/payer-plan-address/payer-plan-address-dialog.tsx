'use client'

import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PayerPlanAddress } from '@/types/payer'
import { PayerPlanAddressForm } from './payer-plan-address-form'

interface PayerPlanAddressFormProps {
  isEditMode: boolean
  data?: PayerPlanAddress | null
}

const PayerPlanAddressDialog = ({ isEditMode,data }: PayerPlanAddressFormProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {isEditMode ? (
          <IconButton variant="ghost">
            <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
          </IconButton>
        ) : (
          <Button size="1" highContrast>
            <PlusIcon /> Add Payer Address
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[900px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {isEditMode ? 'Edit' : 'Add'} Payer Address
        </Dialog.Title>
        <PayerPlanAddressForm data={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PayerPlanAddressDialog }
