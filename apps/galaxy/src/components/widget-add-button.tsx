'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'

type FillOutButtonProps = PropsWithChildren<{
  title?: string
}>

const WidgetAddButton = ({ title, children }: FillOutButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          <Flex justify="between" align="center" gap="1">
            <PlusIcon height={16} width={16} />
            <Text>Add</Text>
          </Flex>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-h-[80vh] max-w-[70vw] overflow-y-scroll">
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            {title}
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WidgetAddButton }
