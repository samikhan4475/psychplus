'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type ActionErrorState } from '@psychplus-v2/api'
import { DocumentType } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import {
  ConsentView,
  FormFieldContainer,
  FormFieldLabel,
  FormHeading,
  ToggleableForm,
} from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
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

const ALLOWED_CARDS = ['amex', 'discover', 'mastercard', 'visa']

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

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const [focus, setFocus] = useState(false)
  const [showConsentView, setShowConsentView] = useState({
    visible: false,
    type: DocumentType.TERMS_AND_CONDITIONS,
  })

  const form = useForm({
    reValidateMode: 'onChange',
  })

  const onSubmit = async () => {
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
      name: profile.legalName.firstName + ' ' + profile.legalName.lastName,
      cardKey: stripeResult.paymentMethod.id,
      cardType: cardBrand,
      expireMonth: card.exp_month,
      expireYear: card.exp_year,
      numberLastFour: card.last4,
      isActive: true,
      patientId: profile.id,
      isPrimary: !existingCards?.length,
    })
  }

  const onSuccess = () => {
    router.refresh()
    onFormClose?.()
  }

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
      <FormHeading title="Add Card" />
      <Flex gap="4" direction="column" className="w-full">
        <FormFieldContainer className="w-full md:w-5/12">
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
    </ToggleableForm>
  )
}

export { CreditCardForm }
