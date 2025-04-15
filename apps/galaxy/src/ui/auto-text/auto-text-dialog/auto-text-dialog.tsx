'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { UserSetting } from '@/types'
import { AutoTextForm } from './auto-text-form'

interface AutoTextDialogProps {
  title: string
  data?: UserSetting
  onUpdate?: (updateAutoText: UserSetting) => void
}

const AutoTextDialog = ({
  children,
  title,
  data,
  onUpdate,
}: PropsWithChildren<AutoTextDialogProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = (open: boolean) => setIsOpen(open)
  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      {children}
      <Dialog.Content className="relative max-w-[662px] overflow-visible">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{title}</Dialog.Title>
        <AutoTextForm
          data={data}
          onClose={(res) => {
            onToggle(false)
            res && onUpdate?.(res)
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AutoTextDialog }
