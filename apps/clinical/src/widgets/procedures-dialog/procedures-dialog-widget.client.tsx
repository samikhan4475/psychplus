'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { ProcedureFormDialogProps } from '@psychplus/procedures'
import { ProcedureForm } from './components'

const ProceduresDialogWidgetClient = ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}: ProcedureFormDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {isEdit ? 'Edit' : 'Add'} Procedure
        </Dialog.Title>
        <ProcedureForm isEdit={isEdit} closeDialog={closeDialog} data={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ProceduresDialogWidgetClient }
