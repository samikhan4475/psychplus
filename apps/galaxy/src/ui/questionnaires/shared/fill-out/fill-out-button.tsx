'use client'

import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea } from '@radix-ui/themes'

type FillOutButtonProps = PropsWithChildren<{
  title?: string
}>

const FillOutButton = ({ title, children }: FillOutButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2" className="h-auto bg-accent-11 px-6 py-1">
          Fill out
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="70vw" className="relative">
        <ScrollArea style={{ height: '80vh' }}>
          <Flex justify="between" align="center" pr="3" mb="2">
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
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { FillOutButton }
