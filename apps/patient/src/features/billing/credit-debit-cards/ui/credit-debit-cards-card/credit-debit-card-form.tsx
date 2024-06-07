'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ActionErrorState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import { cn, zipCodeSchema } from '@psychplus-v2/utils'
import { Box, Checkbox, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CodesetFormSelect,
  CreditDebitCardsIcon,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ToggleableForm,
} from '@/components-v2'
import { addCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import { CreditCard } from '../../types'

const STRIPE_INPUT_STYLE = {
  base: {
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
  },
}

const schema = z.object({
  fullname: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: zipCodeSchema,
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

type SchemaType = z.infer<typeof schema>

const CreditCardForm = ({
  trigger,
  creditCard,
  existingCards,
  triggerClassName,
}: {
  trigger: any
  creditCard?: CreditCard
  existingCards?: CreditCard[]
  triggerClassName?: string
}) => {
  const router = useRouter()
  const stripe = useStripe()

  const elements = useElements()

  const [focus, setFocus] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      userAgreed: false,
      fullname: creditCard?.name || '',
      address: creditCard?.billingAddress.street1 || '',
      city: creditCard?.billingAddress.city || '',
      state: creditCard?.billingAddress.state || '',
      postalCode: creditCard?.billingAddress.postalCode || '',
    },
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
      !stripeResult.paymentMethod.card
    ) {
      return {
        state: 'error',
        error:
          stripeResult.error?.message ?? 'Could not collect credit card info',
      } as ActionErrorState
    }

    const isDuplicate = existingCards?.some((card) => {
      return (
        card.numberLastFour === stripeResult?.paymentMethod?.card?.last4 &&
        card.expireMonth === stripeResult?.paymentMethod?.card?.exp_month &&
        card.expireYear === stripeResult?.paymentMethod?.card?.exp_year
      )
    })

    if (isDuplicate) {
      return {
        state: 'error',
        error: 'This card is already exists in your account.',
      } as ActionErrorState
    }

    const {
      paymentMethod: { card },
    } = stripeResult

    return addCreditCardAction({
      name: data.fullname,
      cardKey: stripeResult.paymentMethod.id,
      cardType: card.brand,
      expireMonth: card.exp_month,
      expireYear: card.exp_year,
      numberLastFour: card.last4,
      postalCode: data.postalCode,
      address: data.address,
      city: data.city,
      state: data.state,
      isPrimary: true,
    })
  }

  const onSuccess = () => {
    router.refresh()
    form.reset({
      fullname: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
    })
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={onSubmit}
      onSuccess={onSuccess}
      trigger={trigger}
      disabled={!stripe || !elements}
      toastData={{
        title: `${creditCard ? 'Updated' : 'Added'} credit card`,
      }}
      triggerClassName={triggerClassName}
    >
      <Flex gap="4" direction="column" className="w-full">
        <Flex
          className="w-full rounded-1 border border-gray-6"
          px="2"
          py="1"
          align="center"
          justify="between"
          gap="2"
        >
          <Text size="2" weight="medium" className="whitespace-nowrap">
            We accept all major Credit & Debit Cards
          </Text>

          <Flex>
            <CreditDebitCardsIcon />
          </Flex>
        </Flex>

        <Flex className="w-full  rounded-t-1 bg-[#F0F4FF]" px="2" py="2">
          <Text size="2" weight="medium">
            Credit & Debit Cards Details
          </Text>
        </Flex>

        <Flex
          className="w-full font-regular"
          align="center"
          justify="between"
          gap="4"
        >
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Name on Card</FormFieldLabel>

            <TextFieldInput
              size="3"
              {...form.register('fullname')}
              placeholder="Full name on card"
            />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Credit Card Number</FormFieldLabel>
            <Box
              py="2"
              px="3"
              className={cn('-m-[1px] h-10 rounded-2 border border-gray-6', {
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
                  hidePostalCode: true,
                }}
              />
            </Box>
          </FormFieldContainer>
        </Flex>
        <Flex mt="-3">
          <FormFieldError name="fullname" />
        </Flex>

        <Flex className="w-full  rounded-t-1 bg-[#F0F4FF]" px="2" py="2">
          <Text size="2" weight="medium">
            Billing Address
          </Text>
        </Flex>
      </Flex>

      <Flex className="w-full">
        <FormFieldContainer className="w-full">
          <FormFieldLabel required>Address 1</FormFieldLabel>
          <TextFieldInput
            size="3"
            radius="full"
            {...form.register('address')}
            placeholder="Enter Complete Address"
          />
          <FormFieldError name="address" />
        </FormFieldContainer>
      </Flex>

      <Flex className="w-full" gap="4">
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Zip Code</FormFieldLabel>
          <TextFieldInput
            size="3"
            radius="full"
            {...form.register('postalCode')}
            placeholder="Zip Code"
          />
          <FormFieldError name="postalCode" />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>City</FormFieldLabel>
          <TextFieldInput
            size="3"
            radius="full"
            {...form.register('city')}
            placeholder="City"
          />
          <FormFieldError name="city" />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>State</FormFieldLabel>
          <CodesetFormSelect
            size="3"
            name={'state'}
            codeset={CODESETS.UsStates}
          />
          <FormFieldError name="state" />
        </FormFieldContainer>
      </Flex>

      <FormFieldContainer mb="2">
        <Flex direction="row" gap="2" align="center">
          <Checkbox
            id="terms-and-conditions-checkbox"
            size="3"
            onCheckedChange={(checked: boolean) => {
              form.setValue('userAgreed', checked)
              form.trigger('userAgreed')
            }}
            {...form.register('userAgreed')}
            highContrast
          />
          <FormFieldLabel
            className="text-[14px] font-[400]"
            id="terms-and-conditions-checkbox"
          >
            I have read the terms & conditions and card holder has agreed to
            place the card on file
          </FormFieldLabel>
        </Flex>
        <FormFieldError name="userAgreed" />
      </FormFieldContainer>
    </ToggleableForm>
  )
}

export { CreditCardForm }
