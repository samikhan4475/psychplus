'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { Button, Dialog, Flex, TextArea } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CloseDialogIcon,
  FormError,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components-v2'
import { useToast } from '@/providers'
import { cancelMembership } from '../actions'

const schema = z.object({
  reason: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const CancelMembership = () => {
  const [error, setError] = useState<string>()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      reason: '',
    },
  })

  const onCancel = async (data: SchemaType) => {
    setError(undefined)
    setLoading(true)

    const result = await cancelMembership({
      reason: data.reason || 'No feedback',
      type: 'Plus',
    })

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Membership Cancelled',
    })

    setOpen(false)
    setLoading(false)

    router.refresh()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Flex align="start" gap="2">
          <Button variant="outline" color="tomato">
            Cancel
          </Button>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <FormContainer form={form} onSubmit={onCancel}>
          <CloseDialogIcon />
          <Dialog.Title className="font-sans -tracking-[0.25px]">
            Cancel Membership
          </Dialog.Title>
          <FormError message={error} />
          <Dialog.Description size="3" className="text-slate-11">
            Are you sure you want to cancel your membership?
          </Dialog.Description>

          <FormFieldContainer mt="4">
            <FormFieldLabel>Feedback (optional)</FormFieldLabel>
            <TextArea
              placeholder="Enter your feedback here..."
              size="2"
              maxLength={250}
              {...form.register('reason')}
            />
          </FormFieldContainer>
          <Flex
            gap="3"
            mt="4"
            justify="end"
            direction={{ initial: 'column', xs: 'row' }}
          >
            <Dialog.Close>
              <Button variant="outline" color="gray" highContrast>
                No, keep membership
              </Button>
            </Dialog.Close>
            <Button color="tomato" type="submit" disabled={loading}>
              Yes, cancel membership
            </Button>
          </Flex>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CancelMembership }
