'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { PatientProfile } from '@psychplus-v2/types'
import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  Link,
  RadioGroup,
  Text,
} from '@radix-ui/themes'
import { useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import Stripe from 'stripe'
import z from 'zod'
import {
  CloseDialogIcon,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  RadioGroupItem,
} from '@/components-v2'
import { useToast } from '@/providers'
import { CreditCard } from '../../payments/types'
import {
  activateMembership,
  createSubscriptionAction,
  getBenefits,
} from '../actions'
import { useStore } from '../store'
import { MembershipBenefit } from '../types'

const schema = z.object({
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

type SchemaType = z.infer<typeof schema>

type ActivateMembershipProps = {
  creditCards: CreditCard[]
  user: PatientProfile
}

const ActivateMembership = ({ creditCards, user }: ActivateMembershipProps) => {
  const router = useRouter()
  const [creditCard, setCreditCard] = useState<CreditCard>(creditCards?.[0])
  const { isMembershipDialogOpen, setIsMembershipDialogOpen } = useStore()
  const [error, setError] = useState<string>()
  const stripe = useStripe()
  const { toast } = useToast()

  const [membershipBenefits, setMembershipBenefits] =
    useState<MembershipBenefit>()

  useEffect(() => {
    getBenefits().then((res) => {
      if (res.state === 'error') {
        throw new Error(res.error)
      }
      setMembershipBenefits(res.data)
    })
  }, [])

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      userAgreed: false,
    },
  })

  const onSubmit = async () => {
    if (!stripe) {
      return
    }

    setError(undefined)

    if (!user.chargeKey) {
      setError('Please add a card to your account.')
      return
    }

    const subscriptionResponse = await createSubscriptionAction({
      customerId: user.chargeKey,
      payment_method: creditCard.cardKey,
    })

    if (subscriptionResponse.state === 'error') {
      setError(subscriptionResponse.error)
      return
    }

    const paymentInvoice = subscriptionResponse.data.latest_invoice

    if (!paymentInvoice || typeof paymentInvoice !== 'object') {
      setError('No payment invoice found.')
      return
    }

    const paymentIntent = paymentInvoice.payment_intent as Stripe.PaymentIntent

    const result = await activateMembership({
      type: 'Plus',
      paymentDate: new Date().toISOString(),
      paymentMethod: 'CreditCard',
      permanentTransactionId: paymentIntent.id,
      subscriptionId: subscriptionResponse.data.id,
    })

    if (result.state === 'error') {
      setError(result.error)
      return
    }

    toast({
      type: 'success',
      title: 'Membership Activated',
    })

    router.refresh()
    setIsMembershipDialogOpen(false)
  }

  return (
    <Dialog.Root
      open={isMembershipDialogOpen}
      onOpenChange={(open) => {
        setIsMembershipDialogOpen(open)
        setError(undefined)
        setCreditCard(creditCards?.[0])
      }}
    >
      <Dialog.Trigger>
        <Flex align="start" gap="2">
          <Button highContrast>Upgrade</Button>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[700px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <CloseDialogIcon />
          <Dialog.Title className="font-sans -tracking-[0.25px]">
            Activate Membership
          </Dialog.Title>
          <FormError message={error} />

          {creditCard ? (
            <>
              <Text weight="bold" size="4" my="2">
                Choose payment method
              </Text>
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
              <Flex align="start" justify="between" mt="4">
                <FormFieldContainer>
                  <Flex direction="row" gap="2" align="center">
                    <Checkbox
                      id="terms-and-conditions-checkbox"
                      size="3"
                      onCheckedChange={(checked: boolean) =>
                        form.setValue('userAgreed', checked)
                      }
                      {...form.register('userAgreed')}
                      highContrast
                    />
                    <FormFieldLabel
                      className="text-[14px] font-[400]"
                      id="terms-and-conditions-checkbox"
                    >
                      I agree to electronically sign{' '}
                      <Link
                        href="https://staging.psychplus.dev/Common/User/DownloadPolicyPdfDocuments?documentName=MembershipPlanNew.html"
                        target="_blank"
                        className="text-accent-11"
                      >
                        Membership Subscription
                      </Link>
                      .
                    </FormFieldLabel>
                  </Flex>
                  <FormFieldError name="userAgreed" />
                </FormFieldContainer>
                <Flex align="center" gap="2">
                  <Text size="4" weight="bold">
                    Amount:
                  </Text>
                  <Text size="4" className="ml-1" weight="bold">
                    ${membershipBenefits?.priceLevels[0].cost}
                  </Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Text>
              You have not added any payment methods to your account. Please{' '}
              <Link
                asChild
                onClick={() => {
                  setIsMembershipDialogOpen(false)
                }}
              >
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
                Cancel
              </Button>
            </Dialog.Close>
            {creditCard ? (
              <FormSubmitButton size="2" highContrast>
                Activate
              </FormSubmitButton>
            ) : null}
          </Flex>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActivateMembership }
