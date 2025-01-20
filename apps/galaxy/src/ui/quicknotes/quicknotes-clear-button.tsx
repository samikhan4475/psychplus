'use client'

import React from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert, X } from 'lucide-react'
import { postEvent } from '@/utils'

const QuickNotesClearButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" color="gray" size="1" className="text-black">
          Clear
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="bg-pp-warning-bg relative max-w-[440px] rounded-1 border-2 border-amber-10 p-4 pb-5 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>

        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-amber-9" size={24} />
          <Flex direction="column" gap="1" pt="1">
            <Dialog.Title size="4" className="m-0 font-medium">
              Clear Quick Notes
            </Dialog.Title>
            <Text as="p" size="2" mt="2">
              Are you sure you want to clear quick notes ?
            </Text>
            <Flex justify="start" width="100%" gap="2" mt="3">
              <Dialog.Close>
                <Button className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid">
                  <Text size="2">Cancel</Text>
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  onClick={() => postEvent({ type: 'quicknotes:clear' })}
                  className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
                >
                  <Text size="2">Proceed</Text>
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { QuickNotesClearButton }
