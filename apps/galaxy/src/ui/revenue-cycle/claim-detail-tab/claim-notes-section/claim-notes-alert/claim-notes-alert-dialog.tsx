'use client'

import { useEffect, useState } from 'react'
import { Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ClaimNotesResponse } from '@/types'
import { cn, formatDate } from '@/utils'
import { useStore } from '../../store'

interface ClaimNotesAlertDialogProps {
  data: ClaimNotesResponse[]
  claimId: string
}

const ClaimNotesAlertDialog = ({
  data,
  claimId,
}: ClaimNotesAlertDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const { openAlertModal, openClaimNotesAlert } = useStore((state) => ({
    openAlertModal: state.openAlertModal,
    openClaimNotesAlert: state.openClaimNotesAlert,
  }))
  useEffect(() => {
    if (data.length > 0 && !openClaimNotesAlert) {      
      setOpenDialog(true)
      openAlertModal(true)
    }
  }, [data, claimId])
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open)
  }
  return (
    <Dialog.Root open={openDialog} onOpenChange={handleOpenDialog}>
      <Dialog.Content className="relative max-w-[900px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Claim Notes Alert
        </Dialog.Title>
        {data.map((note) => (
          <Flex
            key={note.id}
            className={cn(
              'bg-white -mt-[1px] mb-2 flex-col border border-gray-5 p-2',
            )}
          >
            <Flex align="center">
              <Text className="text-[11.5px] ">{note.note}</Text>
            </Flex>
            <Flex gap="1" className="whitespace-nowrap">
              <Text className="text-[11.5px] font-[600]">Created Date:</Text>
              <Text className={cn('text-[11.5px]')}>
                {formatDate(note.metadata?.createdOn)}
              </Text>
              <Text className="text-[11.5px] font-[600]">Created By:</Text>
              <Text className={cn('text-[11.5px]')}>
                {note.metadata?.createdByFullName}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimNotesAlertDialog }
