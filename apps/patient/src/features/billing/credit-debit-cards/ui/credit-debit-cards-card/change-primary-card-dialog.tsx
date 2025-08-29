'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import type { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { useToast } from '@/providers'
import { UpdateCreditCardAction } from '../../actions'

const ChangePrimaryCardDialog = ({
  creditCard,
  trigger = 'Set as Primary',
}: {
  creditCard: CreditCard
  trigger?: React.ReactElement | string
}) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const router = useRouter()

  const onChangePrimarycard = async () => {
    setError(undefined)
    setLoading(true)

    const result = await UpdateCreditCardAction({
      ...creditCard,
      isPrimary: true,
    })

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Primary Card Changed',
    })

    router.refresh()
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex align="start" className="group cursor-pointer">
        <Dialog.Trigger>
          <Text className="text-[#194595] underline" size="2">
            {trigger}
          </Text>
        </Dialog.Trigger>
      </Flex>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Change Primary Card
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3">
          Are you sure you want to change your primary card?
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            className={`bg-[#24366B] ${loading && 'bg-gray-3'}`}
            onClick={onChangePrimarycard}
            disabled={loading}
          >
            Change Primary Card
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ChangePrimaryCardDialog }
