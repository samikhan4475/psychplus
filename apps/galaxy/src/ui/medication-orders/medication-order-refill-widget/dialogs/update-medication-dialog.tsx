'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { MedicationRefill } from '../types'
import { UpdateMedicationForm } from './update-medication-form'

interface UpdateMedicationDialogProps {
  row: Row<MedicationRefill>
}
const UpdateMedicationDialog = ({ row }: UpdateMedicationDialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => setOpen(open)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
        >
          <Text className="text-pp-black-3 text-1">Approve</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative min-h-[50dvh] max-w-[1070px] !overflow-visible">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>Modify Prescription Request </Dialog.Title>
        <UpdateMedicationForm data={row.original} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { UpdateMedicationDialog }
