'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Dialog } from '@radix-ui/themes'
import { HealthConcernDialogClientProps, HealthConcernForm } from '.'

const HealthConcernDialogWidgetClient = ({
  isEdit = false,
  isDialogOpen,
  toggleDialog,
  data,
}: HealthConcernDialogClientProps) => {
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={toggleDialog}>
      <Dialog.Content className="relative max-w-[720px] p-12 ">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {isEdit ? 'Edit' : 'Add'} Health Concern
        </Dialog.Title>

        <Box mt="4">
          <HealthConcernForm
            isEdit={isEdit}
            data={data}
            closeDialog={toggleDialog}
          />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HealthConcernDialogWidgetClient }
