'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { AddVisitForm } from '@/ui/visit/add-visit/components'

const CloseDialogIcon = () => (
  <Dialog.Close className="absolute right-3 top-3 cursor-pointer">
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[35px] w-[35px] text-gray-11 transition-colors hover:bg-gray-3"
    >
      <Cross1Icon width={20} height={20} strokeWidth={1.5} />
    </Flex>
  </Dialog.Close>
)

const AddVisit = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
        >
          <Plus width={16} height={16} />
          Follow up
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogIcon />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Visit
        </Dialog.Title>

        <AddVisitForm showAddUser={false} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
