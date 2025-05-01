'use client'

import { useState } from 'react'
import { Dialog, Flex, IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { FileListIcon } from '@/components/icons'
import { useStore } from '@/ui/assigning-authorities/store'
import { Code } from '@/ui/assigning-authorities/types'
import { ManageAttributesForm } from './manage-attributes-form'

const ManageAttributesButton = ({ code }: { code: Code }) => {
  const { setSelectedCode } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        setSelectedCode(code)
        setIsOpen(isOpen)
      }}
    >
      <Dialog.Trigger>
        <IconButton size="1" color="gray" variant="ghost">
          <FileListIcon
            width={16}
            height={16}
            className="cursor-pointer"
            fill="black"
          />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className="w-[600px] rounded-2 p-5">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="bold">
            Manage Attributes
          </Dialog.Title>

          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>

        <ManageAttributesForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ManageAttributesButton }
