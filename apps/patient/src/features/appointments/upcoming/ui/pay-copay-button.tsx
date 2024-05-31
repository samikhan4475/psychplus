'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { PatientProfile } from '@psychplus-v2/types'
import { formatCurrency } from '@psychplus-v2/utils'
import { Button, Dialog, Flex, Link, RadioGroup, Text } from '@radix-ui/themes'
import { ChevronRightIcon } from 'lucide-react'
import { CloseDialogIcon, FormError, RadioGroupItem } from '@/components-v2'
import { CreditCard } from '@/features/billing/payments/types'
import { useToast } from '@/providers'
import { payCopay } from '../actions'

type PayCopayProps = {
  creditCards: CreditCard[]
  user: PatientProfile
  appointmentId: number
  copay: number
}

const PayCopayButton = ({
  creditCards,
  user,
  appointmentId,
  copay,
}: PayCopayProps) => {
  const router = useRouter()
  const [creditCard, setCreditCard] = useState<CreditCard>(creditCards?.[0])
  const [error, setError] = useState<string>()
  const { toast } = useToast()
  const [isOpenCopayDialog, setIsOpenCopayDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const onPayCopay = async () => {
    setError(undefined)

    if (!user.chargeKey) {
      setError('Please add a card to your account.')
      return
    }

    setLoading(true)
    const result = await payCopay({
      cardId: creditCard?.id,
      amount: copay,
      appointmentId,
      paymentType: '0',
      paymentMethod: '0',
    })

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Copay Paid',
    })

    setIsOpenCopayDialog(false)

    router.refresh()
  }

  return (
    <Dialog.Root
      open={isOpenCopayDialog}
      onOpenChange={(open) => {
        setIsOpenCopayDialog(open)
        setError(undefined)
        setCreditCard(creditCards?.[0])
      }}
    >
      <Dialog.Trigger>
        <Button highContrast className="bg-[#194595]" radius="full">
          <Flex gap="1" align="center">
            <Text>Pay Now</Text>

            <ChevronRightIcon height="16" width="16" />
          </Flex>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Pay Copay
        </Dialog.Title>
        <FormError message={error} />
        {creditCard ? (
          <>
            <Text weight="bold" size="4" my="2">
              Choose payment method
            </Text>
            <Flex
              direction={{ initial: 'column', xs: 'row' }}
              justify="between"
            >
              <RadioGroup.Root
                name="example"
                value={creditCard.cardKey}
                onValueChange={(value) => {
                  const selectedCard = creditCards.find(
                    (card) => card.cardKey === value,
                  )
                  if (selectedCard) {
                    setCreditCard(selectedCard)
                  }
                }}
              >
                <Flex direction="column" gap="1">
                  {creditCards.map((card) => (
                    <RadioGroupItem
                      key={card.cardKey}
                      id={card.cardKey}
                      value={card.cardKey}
                    >
                      {card.cardType} ending in{' '}
                      <Text className="font-[600]">{card.numberLastFour}</Text>
                    </RadioGroupItem>
                  ))}
                </Flex>
              </RadioGroup.Root>
              <Flex align="end">
                <Flex align="end" gap="2">
                  <Text size="4" weight="bold">
                    Amount:
                  </Text>
                  <Text size="4" className="ml-1" weight="bold">
                    {formatCurrency(copay)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <Text>
            You have not added any payment methods to your account. Please{' '}
            <Link asChild>
              <NextLink href="/billing/payments" prefetch={false}>
                add a payment method
              </NextLink>
            </Link>{' '}
            and then try again.
          </Text>
        )}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Later
            </Button>
          </Dialog.Close>
          {creditCard ? (
            <Button
              disabled={loading}
              onClick={onPayCopay}
              size="2"
              highContrast
            >
              Pay Now
            </Button>
          ) : null}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PayCopayButton }
