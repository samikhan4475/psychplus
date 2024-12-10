'use client'

import { useState } from 'react'
import { Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { TrashIcon, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { deleteStaffAction } from '../../actions/delete-staff'
import { useStore } from '../../store'
import { CancelButton } from './cancel-button'
import { DeleteButton } from './delete-button'

interface DeleteDialogProps {
  staffId: string
}

const DeleteDialog = ({ staffId }: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const search = useStore((state) => state.search)

  const deleteRecord = (
    e: React.MouseEvent<HTMLButtonElement | SVGElement>,
  ) => {
    e.stopPropagation()
    deleteStaffAction(staffId).then((result) => {
      if (result.state === 'success') {
        toast.success('Staff Deleted Successfully')
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
      search()
    })
  }
  const onOpen = (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(!!open)}>
      <IconButton onClick={onOpen} size="1" color="gray" variant="ghost">
        <TrashIcon
          onClick={onOpen}
          width={16}
          height={16}
          className="text-pp-gray-1"
        />
      </IconButton>
      <Dialog.Content className="relative max-w-[648px] rounded-2 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X onClick={(e) => e.stopPropagation()} size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" weight="bold" className="m-0 mb-2 mt-2">
          Are you sure you want to delete?
        </Dialog.Title>
        <Flex direction="column" gap="7">
          <Text size="3" weight="regular">
            Do you really want to delete this record?
          </Text>
          <Flex justify="end" gap="2">
            <CancelButton />
            <DeleteButton onClick={deleteRecord} />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteDialog }
