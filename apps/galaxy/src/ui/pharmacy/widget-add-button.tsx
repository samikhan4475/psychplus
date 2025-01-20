'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'

type FillOutButtonProps = PropsWithChildren<{
  title?: string
  onClose?: () => void
  onClick?: () => boolean
}>

const WidgetAddButton = ({
  title,
  children,
  onClose,
  onClick,
}: FillOutButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleTriggerClick = () => {
    if (onClick) {
      const shouldOpen = onClick()
      if (!shouldOpen) return
    }
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        size="1"
        color="gray"
        className="text-black"
        onClick={handleTriggerClick}
      >
        <Flex justify="between" align="center" gap="1">
          <PlusIcon height={16} width={16} />
          <Text>Add</Text>
        </Flex>
      </Button>

      <Dialog.Content className="relative max-h-[80vh] max-w-[70vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            {title}
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer" onClick={handleClose}>
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WidgetAddButton }
