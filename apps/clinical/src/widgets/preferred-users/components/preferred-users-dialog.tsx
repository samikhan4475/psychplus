'use client'

import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { Dialog, Flex, Text } from '@radix-ui/themes'
import { PreferredUsersDialogContent } from './preferred-users-dialog-content'

const PreferredUsersDialog = ({ data }:any ) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex className="cursor-pointer gap-[3px]" align="center">
          <UploadIcon />
          <Text className="font-bold text-[12px] text-black">Upload</Text>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[90%] w-full h-[calc(100vh-172px)] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8" className="-mt-[30px]">
          <Text className="font-bold text-[20px]">Upload Excel Sheet</Text>
        </Dialog.Title>
        <PreferredUsersDialogContent />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreferredUsersDialog }
