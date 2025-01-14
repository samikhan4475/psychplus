'use client'

import React, { PropsWithChildren, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { VacationForm } from './vacation-form'

interface VacationDialogProps {
  title: string
}
const VacationDialog = ({
  title,
  children,
}: PropsWithChildren<VacationDialogProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = (open: boolean) => setIsOpen(open)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      {children}
      <Dialog.Content className="relative max-w-[600px] overflow-visible rounded-2">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{title}</Dialog.Title>
        <VacationForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { VacationDialog }
