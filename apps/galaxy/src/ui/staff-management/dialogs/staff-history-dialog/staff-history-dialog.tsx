'use client'

import React, { useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { FilterForm } from './filter-form'
import { StaffListTable } from './staff-history-list-table'

interface StaffHistoryDialogProps {
  staffId: string
  children: React.ReactNode
}

const StaffHistoryDialog = ({ children, staffId }: StaffHistoryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = (open: boolean) => setIsOpen(open)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => onToggle(open)}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[1000px] !overflow-visible rounded-2 p-6">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="medium">
            History
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <FilterForm />
        <StaffListTable staffId={staffId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { StaffHistoryDialog }
