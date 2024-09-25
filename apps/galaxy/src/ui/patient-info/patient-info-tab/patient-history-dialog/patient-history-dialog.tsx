'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'
import { HistoryIcon, X } from 'lucide-react'
import { FilterForm } from './filter-form'
import { PatientDetails } from './patient-details'
import { PatientHistoryTable } from './patient-history-table'

const PatientHistoryDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" color="gray" variant="outline">
          <HistoryIcon width={15} height={15} strokeWidth={1.75} />
          Patient Info Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[1273px] rounded-2 px-6 py-4">
        <Dialog.Title size="4">Patient Hx</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Flex direction="column" gap="2">
          <FilterForm />
          <Flex gap="2">
            <PatientHistoryTable />
            <PatientDetails />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientHistoryDialog }
