'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ActionErrorState } from '@psychplus-v2/api'
import { DocumentType } from '@psychplus-v2/types'
import { cn, zipCodeSchema } from '@psychplus-v2/utils'
import {
  Box,
  Flex,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  BillingAddressAutocompleteForm,
  ConsentView,
  CreditDebitCardsIcon,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ToggleableForm,
} from '@/components-v2'
import { addCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import { useGooglePlacesContext } from '@/providers'
import { CreditCard } from '../../types'

const STRIPE_INPUT_STYLE = {
  base: {
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
  },
}

const ALLOWED_CARDS = ['amex', 'discover', 'mastercard', 'visa']

const schema = z.object({
  fullname: z.string().min(1, 'Required'),
  address: z
    .string()
    .min(1, 'Required')
    .max(100, 'Max 100 characters are allowed.'),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: zipCodeSchema,
})

type SchemaType = z.infer<typeof schema>

const CreditCardForm = ({
  trigger,
  creditCard,
  existingCards,
  triggerClassName,
  onFormClose,
}: {
  trigger?: any
  creditCard?: CreditCard
  existingCards?: CreditCard[]
  triggerClassName?: string
  onFormClose?: () => void
}) => {
  const router = useRouter()
  const stripe = useStripe()

  const elements = useElements()

  const [focus, setFocus] = useState(false)
  const [showConsentView, setShowConsentView] = useState({
    visible: false,
    type: DocumentType.TERMS_AND_CONDITIONS,
  })

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
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

    let cardBrand = card.brand

    if (!ALLOWED_CARDS.includes(card.brand)) {
      return {
        state: 'error',
        error: 'This card type is not allowed.',
      } as ActionErrorState
    }

    cardBrand = cardBrand === 'amex' ? 'AmericanExpress' : cardBrand

    return addCreditCardAction({
      name: data.fullname,
      cardKey: stripeResult.paymentMethod.id,
      cardType: cardBrand,
      expireMonth: card.exp_month,
      expireYear: card.exp_year,
      numberLastFour: card.last4,
      postalCode: data.postalCode,
      address: data.address,
      city: data.city,
      state: data.state,
      isPrimary: !existingCards?.length,
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
    onFormClose?.()
  }

  const { loaded } = useGooglePlacesContext()

  return (
    <ToggleableForm
      form={form}
      submitAction={onSubmit}
      onSuccess={onSuccess}
      trigger={trigger}
      disabled={!stripe || !elements}
      toastData={{
        title: `Credit Card ${creditCard ? 'Updated' : 'Added'}`,
      }}
      triggerClassName={triggerClassName}
      onFormClose={onFormClose}
    >
      <ConsentView
        open={showConsentView.visible}
        setOpen={(open) => {
          setShowConsentView({ ...showConsentView, visible: open })
        }}
        documentType={showConsentView.type}
      />

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
            Credit & Debit Card Details
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
              autoFocus
            />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Card Number</FormFieldLabel>
            <Box
              py="2"
              px="3"
              className={cn('-m-[1px] h-10 rounded-6 border border-gray-6', {
                'border-transparent shadow-[0_0_0_2px_var(--color-focus-root)]':
                  focus,
              })}
            >
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

      {loaded ? <BillingAddressAutocompleteForm /> : null}
    </ToggleableForm>
  )
}

export { CreditCardForm }
