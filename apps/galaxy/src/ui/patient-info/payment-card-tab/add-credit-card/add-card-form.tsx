'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  FormContainer,
  FormError,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CreditCardType } from '@/constants'
import { AllowedCards, CreditCard } from '@/types'
import { cn, zipCodeSchema } from '@/utils'
import { addPatientCardAction } from '../actions'
import { BillingAddress } from './billing-address'
import { CardDetails } from './card-details'
import { InfoBox } from './info-box'

const STRIPE_INPUT_STYLE = {
  base: {
    fontWeight: '400',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '12px',
    fontSmoothing: 'antialiased',
  },
}

interface AddCardFormProps {
  onClose?: () => void
  patientId: string
  patientCards?: CreditCard[]
}

const schema = z.object({
  name: z
    .string()
    .min(1, 'Required')
    .max(128, 'Max 100 characters are allowed.'),
  address1: z
    .string()
    .min(1, 'Required')
    .max(100, 'Max 100 characters are allowed.'),
  address2: z.string().max(128, 'Max 100 characters are allowed.').optional(),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  zip: zipCodeSchema,
})
export type AddCardFormSchemaType = z.infer<typeof schema>

const AddCardForm = ({
  onClose,
  patientId,
  patientCards,
}: AddCardFormProps) => {
  const stripe = useStripe()
  const router = useRouter()

  const [error, setError] = useState<string>()
  const elements = useElements()
  const [focus, setFocus] = useState(false)

  const form = useForm<AddCardFormSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      address1: '',
      address2: '',
      city: '',
      name: '',
      zip: '',
      state: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<AddCardFormSchemaType> = async (data) => {
    if (!stripe || !elements) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    })

    if (error || paymentMethod?.type !== 'card' || !paymentMethod?.card) {
      setError(error?.message ?? 'Could not collect credit card info')
      return
    }

    const { card } = paymentMethod
    const { last4, exp_month, exp_year, brand } = card

    const isDuplicate = patientCards?.some(
      (patientCard) =>
        patientCard.numberLastFour === last4 &&
        patientCard.expireMonth === exp_month &&
        patientCard.expireYear === exp_year,
    )

    if (isDuplicate) {
      setError('This card already exists in your account.')
      return
    }

    if (!Object.values(AllowedCards).includes(brand as AllowedCards)) {
      setError('Card not supported')
      return
    }

    const cardBrand =
      brand === AllowedCards.Amex ? AllowedCards.AmericanExpress : brand

    const result = await addPatientCardAction(patientId, {
      name: data.name,
      cardKey: paymentMethod.id,
      cardType: cardBrand as CreditCardType,
      expireMonth: exp_month,
      expireYear: exp_year,
      numberLastFour: last4,
      billingAddress: {
        type: 'Billing',
        street1: data.address1,
        street2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.zip,
      },
    })

    if (result.state === 'error') {
      setError(result.error ?? 'Could not add credit card')
      return
    }

    toast.success('Credit Card Added')
    onSuccess()
  }

  const onSuccess = () => {
    router.refresh()
    form.reset({
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    })
    onClose?.()
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FormError message={error} />
      <InfoBox />
      <Flex gap="2" width="100%" direction="column">
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
                disabled: isSubmitting,
                classes: {
                  base: cn(
                    'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] py-[3px] px-1 rounded-1',
                    {
                      'border-blue-8': focus,
                      '!bg-gray-3 !text-gray-11': isSubmitting,
                    },
                  ),
                },
              }}
            />
          </FormFieldContainer>
        </CardDetails>
        <BillingAddress />
        <Flex justify="end" pt="4">
          <Button disabled={isSubmitting} highContrast type="submit">
            Save
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddCardForm }
