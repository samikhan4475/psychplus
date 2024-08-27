'use client'

import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, Separator, Text, Dialog } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import React from 'react'
import { PlusIcon } from '@/components'

interface AccountModalProps {
  modalTitle: string,
  isEditMode?: boolean,
  content: React.ReactNode,
  open?: boolean,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const RelationshipFormDialog = ({ 
  modalTitle, 
  isEditMode = false,
  content, 
  open, 
  setOpen
}: AccountModalProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        {
          !isEditMode ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen?.(true)}
              color="gray"
              className="bg-white h-5 w-[62px] gap-[6px]"
            >
              <PlusIcon />
              <Text className="text-[#194595] text-[12px] font-medium">Add</Text>
            </Button>
          ) : (
            <Flex
              width="100%"
              align="center"
              gap="3"
              onClick={() => setOpen?.(true)}
              className="text-xs font-normal cursor-pointer gap-2 px-2 py-[6px] leading-4 text-[#1C2024] border-b border-b-[#DDDDE3] hidden"
            >
              <Pencil1Icon width="12" />
              <Text size="2">Edit</Text>
            </Flex>
          )
        }
      </Dialog.Trigger>
       
      <Dialog.Content className="relative w-full max-w-[612px] font-bold">
        <Flex width="100%" align="center">
          <Dialog.Title className="font-semibold mb-2 font-sans text-[22px] text-[#1C2024]">
            {modalTitle}
          </Dialog.Title>

          <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
            <Cross2Icon onClick={() => setOpen?.(false)} />
          </Dialog.Close>
        </Flex>
        <Separator size="4" className="mb-4" />
        {content}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RelationshipFormDialog }