'use client'

import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { PenLine } from 'lucide-react'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddNewRoomForm } from './add-new-room-form'
import { ServiceRoom } from './types'

interface AddNewRoomDialogProps {
  data?: ServiceRoom
}

const AddNewRoomDialog = ({ data }: AddNewRoomDialogProps) => {
  const [open, setOpen] = useState(false)
  const onOpenChange = (open: boolean) => setOpen(open)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {data ? (
          <IconButton size="1" color="gray" variant="ghost">
            <PenLine className="text-black" width={18} height={16} />
          </IconButton>
        ) : (
          <Flex className="ml-auto w-[110px]">
            <Button
              size="1"
              className="bg-pp-black-1 text-white h-[25px] flex-1 cursor-pointer rounded-1 px-3 py-1.5"
            >
              <PlusIcon /> Add Room
            </Button>
          </Flex>
        )}
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'Add'} Room
        </Dialog.Title>

        <AddNewRoomForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddNewRoomDialog }
