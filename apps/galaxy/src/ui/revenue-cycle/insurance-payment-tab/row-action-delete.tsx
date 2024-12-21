'use client'

import { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { deleteInsurancePaymentRecord } from '../actions'
import { InsurancePayment } from '../types'
import { useStore } from './store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<InsurancePayment>) => {
  const [open, setOpen] = useState(false)
  const search = useStore((state) => state.search)
  const [loading, setLoading] = useState(false)

  const deleteRecord = async () => {
    if (record.id) {
      setLoading(true)
      const result = await deleteInsurancePaymentRecord(record.id)
      if (result.state === 'error') {
        toast.error(result.error ?? 'Failed to delete insurance payment record')
      } else if (result.state === 'success') {
        toast.success('Insurance payment record deleted successfully')
        search({})
      }
      setLoading(false)
    }
  }

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <IconButton size="1" color="gray" variant="ghost">
          <TrashIcon width={16} height={16} className="text-pp-gray-1" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Confirm Delete
        </Dialog.Title>
        <Text>
          Are you sure you want to delete this insurance payment record?
        </Text>
        <Flex className="mt-4 justify-end gap-2">
          <Button
            color="gray"
            className="text-black"
            size="2"
            variant="outline"
            onClick={onCloseModal}
          >
            <Text size="2">Cancel</Text>
          </Button>
          <Button
            loading={loading}
            className="bg-pp-states-error text-white ml-1"
            onClick={deleteRecord}
          >
            <Text size="2">Confirm</Text>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionDelete }
