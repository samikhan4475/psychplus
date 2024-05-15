'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ActionErrorState } from '@psychplus-v2/api'
import { cn } from '@psychplus-v2/utils'
import { Box, TextFieldInput } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  FieldPlaceholder,
  FormFieldContainer,
  FormFieldLabel,
  ToggleableForm,
} from '@/components-v2'
import { addCreditCardAction } from '@/features/billing/payments/actions'

const STRIPE_INPUT_STYLE = {
  base: {
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
  },
}

const schema = z.object({
  nickname: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const AddCreditCardForm = () => {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [focus, setFocus] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: SchemaType) => {
    if (!stripe || !elements) {
      return
    }

    const stripeResult = await stripe.createPaymentMethod({
      elements,
    })

    if (
      stripeResult.error ||
      stripeResult.paymentMethod.type !== 'card' ||
      !stripeResult.paymentMethod ||
      !stripeResult.paymentMethod.card ||
      !stripeResult.paymentMethod.billing_details.address?.postal_code
    ) {
      return {
        state: 'error',
        error:
          stripeResult.error?.message ?? 'Could not collect credit card info',
      } as ActionErrorState
    }

    const {
      paymentMethod: {
        card,
        billing_details: {
          address: { postal_code: billingPostalCode },
        },
      },
    } = stripeResult

    return addCreditCardAction({
      name: data.nickname,
      cardKey: stripeResult.paymentMethod.id,
      cardType: card.brand,
      expireMonth: card.exp_month,
      expireYear: card.exp_year,
      numberLastFour: card.last4,
      postalCode: billingPostalCode,
      isPrimary: true,
    })
  }

  const onSuccess = () => {
    router.refresh()
    form.reset({ nickname: '' })
  }

  const trigger = <FieldPlaceholder>+ add a new credit card</FieldPlaceholder>

  return (
    <ToggleableForm
      form={form}
      submitAction={onSubmit}
      onSuccess={onSuccess}
      trigger={trigger}
      disabled={!stripe || !elements}
      toastData={{
        title: 'Added credit card',
      }}
    >
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Credit Card Info</FormFieldLabel>
        <Box
          px="2"
          py="3"
          width="100%"
          className={cn('-m-[1px] rounded-2 border border-gray-6', {
            'border-transparent shadow-[0_0_0_2px_var(--color-focus-root)]':
              focus,
          })}
        >
          <CardElement
            onReady={(e) => e.focus()}
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)
            }}
            options={{
              style: STRIPE_INPUT_STYLE,
            }}
          />
        </Box>
      </FormFieldContainer>
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Nickname (optional)</FormFieldLabel>
        <TextFieldInput
          size="3"
          {...form.register('nickname')}
          placeholder="Enter a nickname for this card"
        />
      </FormFieldContainer>
    </ToggleableForm>
  )
}

export { AddCreditCardForm }
