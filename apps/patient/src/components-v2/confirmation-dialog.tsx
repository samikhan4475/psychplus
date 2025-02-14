'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'

interface ConfirmationDialogProps<T = { state: string; error?: string }> {
  trigger: React.ReactElement
  onCancel?: () => void
  onSuccess?: () => void
  confirmAction: () => Promise<T>
  title: string
  saveButtonTitle: string
  cancelButtonTitle?: string
  description: string
  toastTitle?: string
}

const ConfirmationDialog = <T extends { state: string; error?: string }>({
  trigger,
  onCancel,
  onSuccess,
  confirmAction,
  title,
  saveButtonTitle,
  cancelButtonTitle,
  description,
  toastTitle,
}: ConfirmationDialogProps<T>) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const router = useRouter()

  const onConfrim = async () => {
    setError(undefined)
    setLoading(true)

    const result = await confirmAction()

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    if (toastTitle)
      toast({
        type: 'success',
        title: toastTitle,
      })

    router.refresh()
    setOpen(false)
    setLoading(false)
    onSuccess?.()
  }

  const hasRemoveOrDelete = /remove|delete/i.test(title)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex align="start" className="group cursor-pointer">
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
      </Flex>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {title}
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3">{description}</Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              variant="outline"
              color="gray"
              highContrast
              onClick={onCancel}
            >
              {cancelButtonTitle ?? 'Cancel'}
            </Button>
          </Dialog.Close>

          <Button
            color={hasRemoveOrDelete ? 'tomato' : 'blue'}
            highContrast={!hasRemoveOrDelete}
            onClick={onConfrim}
            disabled={loading}
          >
            {saveButtonTitle}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmationDialog }
