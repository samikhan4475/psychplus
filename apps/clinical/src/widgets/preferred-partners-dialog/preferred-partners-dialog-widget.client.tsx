'use client'

import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { PreferredPartnerForm } from './components/preferred-partner-form'

const PreferredPartnersDialogWidgetClient = ({ data }:any ) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-[#151B4A]" size="1">

          {data ? "Edit": <>
            <PlusIcon />
            Add
          </> }
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">{data ? "Edit Preferred Partner" : "Add Preferred Partner"}</Dialog.Title>
        <PreferredPartnerForm isEdit={true} data={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreferredPartnersDialogWidgetClient }
