'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Dialog } from '@radix-ui/themes'
import { ActiveCodeSetDialogClientProps, ActiveCodesetsForm } from '.'

const ActiveCodesetsDialogWidgetClient = ({
  isEdit = false,
  isDialogOpen,
  toggleDialog,
  data,
  authorityId,
}: ActiveCodeSetDialogClientProps) => {
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={toggleDialog}>
      <Dialog.Content className="relative max-w-[720px] p-12 ">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {isEdit ? 'Edit' : 'Add'} Codeset Properties
        </Dialog.Title>

        <Box mt="4">
          <ActiveCodesetsForm
            isEdit={isEdit}
            data={data}
            closeDialog={toggleDialog}
            authorityId={authorityId}
          />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActiveCodesetsDialogWidgetClient }
