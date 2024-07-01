'use client'

import { useState } from 'react'
import { type ActionResult } from '@psychplus-v2/api'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { useToast } from '@/providers'
import { CloseDialogIcon, FormError } from '..'

interface DeleteButtonProps<T> {
  deleteAction: () => Promise<ActionResult<T>>
  onSuccess?: () => void
  confirmTitle: string
  confirmDescription: string
  confirmActionLabel: string
  toastTitle?: string
}

const DeleteButton = <T,>({
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
          <Box className="mt-[-1px] cursor-pointer text-[#194595]" ml="3">
            <Text className="underline" size="2">
              Remove
            </Text>
          </Box>
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