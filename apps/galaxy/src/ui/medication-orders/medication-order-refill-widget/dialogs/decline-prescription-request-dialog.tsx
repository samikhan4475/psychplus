'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { MedicationRefill, RefillMedicationType } from '../types'
import { DeclineMedicationForm } from './decline-prescription-request-form'

interface DeclineMedicationDialogProps {
  row: Row<MedicationRefill>
}
const DeclineMedicationDialog = ({ row }: DeclineMedicationDialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => setOpen(open)
  const filteredData = {
    ...row.original,
    drugList: row?.original?.drugList?.filter(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    ),
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
        >
          <Text className="text-pp-black-3 text-1">Decline</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative  max-w-[550px] !overflow-visible">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>Decline Prescription Request </Dialog.Title>
        <DeclineMedicationForm
          data={filteredData}
          onCloseModal={onOpenChange}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeclineMedicationDialog }
