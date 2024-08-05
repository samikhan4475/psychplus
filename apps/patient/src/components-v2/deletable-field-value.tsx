'use client'

import { useState } from 'react'
import { type ActionResult } from '@psychplus-v2/api'
import { cn } from '@psychplus-v2/utils'
import { Button, Dialog, Flex, Text, Tooltip } from '@radix-ui/themes'
import { useToast } from '@/providers'
import { FormError } from '.'
import { CloseDialogIcon } from './dialog'

interface EditableFieldValueProps<T> {
  textClassName?: string
  deleteAction: () => Promise<ActionResult<T>>
  onSuccess?: () => void
  tooltip: React.ComponentProps<typeof Tooltip>['content']
  confirmTitle: string
  confirmDescription: string
  confirmActionLabel: string
}

const DeletableFieldValue = <T,>({
  children,
  textClassName,
  tooltip,
  deleteAction,
  onSuccess,
  confirmTitle,
  confirmDescription,
  confirmActionLabel,
}: React.PropsWithChildren<EditableFieldValueProps<T>>) => {
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
      title: 'Credit Card Removed',
    })

    onSuccess?.()
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex align="start" className="group cursor-pointer">
        <Text weight="medium" className={cn(textClassName)}>
          {children}
        </Text>

        <Dialog.Trigger>
          <Text className="underline" size="2">
            Remove
          </Text>
        </Dialog.Trigger>
      </Flex>
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

export { DeletableFieldValue }
