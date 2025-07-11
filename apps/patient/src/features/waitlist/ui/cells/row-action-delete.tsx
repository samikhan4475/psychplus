'use client'

import { useState } from 'react'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'
import { deleteWaitlist } from '../../actions'
import { useStore } from '../../store'
import { Waitlist } from '../../types'

const RowActionDelete = ({ row }: { row: Waitlist }) => {
  const [error, setError] = useState<string>()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { fetchWaitlists, page } = useStore()

  const onDelete = async () => {
    setError(undefined)
    setLoading(true)

    const result = await deleteWaitlist(row.id)

    if (result.state === 'error') {
      setError(result.error || 'Failed to delete waitlist')
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Waitlist Deleted',
    })

    setOpen(false)
    setLoading(false)
    fetchWaitlists(page)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton
          onClick={() => setOpen(!open)}
          size="1"
          color="gray"
          variant="ghost"
        >
          <Trash2
            onClick={() => setOpen(!open)}
            width={16}
            height={16}
            className="text-pp-gray-1"
          />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Delete Waitlist
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3" className="text-slate-11">
          Are you sure you want to delete this waitlist?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color="tomato"
            type="submit"
            disabled={loading}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionDelete }
