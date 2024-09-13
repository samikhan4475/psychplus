'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer, FormFieldContainer, FormFieldLabel } from '@/components'
import { cn } from '@/utils'
import { BillingAddress } from './billing-address'
import { CardDetails } from './card-details'
import UserAgreeCheckbox from './user-agree-checkbox'

const STRIPE_INPUT_STYLE = {
  base: {
    fontWeight: '400',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '12px',
    fontSmoothing: 'antialiased',
  },
}
const ALLOWED_CARDS = ['amex', 'discover', 'mastercard', 'visa']

interface AddCardFormProps {
  onClose: () => void
}

const schema = z.object({
  fullname: z.string().min(1, 'Required'),
  address1: z
    .string()
    .min(1, 'Required')
    .max(100, 'Max 100 characters are allowed.'),
  address2: z.string().max(100, 'Max 100 characters are allowed.'),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: z.string().trim().min(1, 'Required').length(5, 'Invalid ZIP'),
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
})
export type SchemaType = z.infer<typeof schema>

const AddCardForm = ({ onClose }: AddCardFormProps) => {
  const stripe = useStripe()
  const router = useRouter()

  const elements = useElements()
  const [focus, setFocus] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      address1: 'xxx-xxxx-xxx-xxx',
      address2: 'jhon',
      city: 'month',
      fullname: '',
      postalCode: 'CVV',
      state: 'year',
      userAgreed: false,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!stripe || !elements) {
      return
    }

    const stripeResult = await stripe.createPaymentMethod({
      elements,
    })

    if (
      stripeResult.error ||
      stripeResult.paymentMethod.type !== 'card' ||
      !stripeResult.paymentMethod?.card
    ) {
      toast.error(
        stripeResult.error?.message ?? 'Could not collect credit card info',
      )

      return
    }

    const {
      paymentMethod: { card },
    } = stripeResult

    if (!ALLOWED_CARDS.includes(card.brand)) {
      toast.error('Card not supported')
    }

    onSuccess()
  }

  const onSuccess = () => {
    router.refresh()
    form.reset({
      fullname: '',
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      userAgreed: false,
    })
    onClose?.()
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap={'2'} width={'100%'} direction={'column'}>
        <CardDetails>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Card Number</FormFieldLabel>
            <CardElement
              onFocus={() => {
                setFocus(true)
              }}
              onBlur={() => {
                setFocus(false)
              }}
              options={{
                style: STRIPE_INPUT_STYLE,
                hidePostalCode: true,

                classes: {
                  base: cn(
                    'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] py-[3px] px-1 rounded-1',
                    {
                      'border-blue-8': focus,
                    },
                  ),
                },
              }}
            />
          </FormFieldContainer>
        </CardDetails>

        <BillingAddress />
        <UserAgreeCheckbox />
        <Flex justify={'end'} pr={'6'}>
          <Button highContrast type="submit">
            Save
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddCardForm }
