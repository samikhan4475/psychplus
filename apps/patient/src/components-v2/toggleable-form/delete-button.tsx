'use client'

import { useState } from 'react'
import { type ActionResult } from '@psychplus-v2/api'
import { Box, Button, Dialog, Flex, Tooltip } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import { useToast } from '@/providers'
import { CloseDialogIcon, FormError } from '..'

interface DeleteButtonProps<T> {
  deleteAction: () => Promise<ActionResult<T>>
  onSuccess?: () => void
  tooltip: React.ComponentProps<typeof Tooltip>['content']
  confirmTitle: string
  confirmDescription: string
  confirmActionLabel: string
  toastTitle?: string
}

const DeleteButton = <T,>({
  tooltip,
  deleteAction,
  onSuccess,
  confirmTitle,
  confirmDescription,
  confirmActionLabel,
  toastTitle = 'Successfully deleted',
}: DeleteButtonProps<T>) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const onDelete = async () => {
    setError(undefined)
    setLoading(true)

    const result = await deleteAction()

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: toastTitle,
    })

    onSuccess?.()
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Flex align="start" gap="2">
          <Tooltip
            content={tooltip}
            delayDuration={300}
            className="max-w-[200px]"
          >
            <Box className="mt-[2px] cursor-pointer text-gray-9 hover:text-accent-12">
              <Trash2Icon width={20} height={20} strokeWidth={1.75} />
            </Box>
          </Tooltip>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {confirmTitle}
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3" className="text-slate-11">
          {confirmDescription}
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Cancel
            </Button>
          </Dialog.Close>
          <Button color="tomato" onClick={onDelete} disabled={loading}>
            {confirmActionLabel}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteButton, type DeleteButtonProps }
