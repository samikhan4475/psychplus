'use client'

import { ReactElement, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, Flex } from '@radix-ui/themes'
import { AddVisitForm } from './components'
import { StateCodeSet } from '../types'

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

const AddVisit = ({
  children,
  states,
}: {
  children: ReactElement
  states: StateCodeSet[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogIcon />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Visit
        </Dialog.Title>

        <AddVisitForm states={states} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
