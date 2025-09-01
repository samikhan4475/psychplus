'use client'

import { ReactNode, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { type ActionErrorState } from '@psychplus-v2/api'
import { DocumentType, PatientProfile } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, TextFieldInput } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import {
  ConsentView,
  FormFieldContainer,
  FormFieldLabel,
  FormHeading,
  PlacesAutocomplete,
  ToggleableForm,
} from '@/components-v2'
import { addCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import { useStore } from '@/widgets/schedule-appointment-list/store'
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

const CardForm = ({
  trigger,
  creditCard,
  existingCards,
  triggerClassName,
  onFormClose,
  isCall = false,
  isUnAuthenticated = false,
  profile,
}: {
  trigger?: ReactNode
  creditCard?: CreditCard
  existingCards?: CreditCard[]
  triggerClassName?: string
  isCall?: boolean
  isUnAuthenticated?: boolean
  onFormClose?: () => void
  profile?: PatientProfile
}) => {
  const searchParams = useSearchParams()
  const shortUrlReference = searchParams.get('reference')
  const router = useRouter()
  const stripe = useStripe()

  const elements = useElements()

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
      stripeResult.paymentMethod?.type !== 'card' ||
      !stripeResult.paymentMethod?.card
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

    const { paymentMethod } = stripeResult
    const card = paymentMethod.card

    if (!ALLOWED_CARDS.includes(card?.brand as string)) {
      return {
        state: 'error',
        error: 'This card type is not allowed.',
      } as ActionErrorState
    }

    let cardBrand = card?.brand

    cardBrand = cardBrand === 'amex' ? 'AmericanExpress' : cardBrand

    let extraFields = {}
    if (isCall) {
      const values = form.getValues()
      extraFields = {
        name: values.name,
        address1: values.primaryStreet,
        address2: values.primaryStreet2 || '',
        city: values.primaryCity,
        state: values.primaryState,
        zipcode: values.primaryPostalCode || '',
      }
    }

    const payload = {
      name: isCall
        ? form.getValues('name')
        : `${profile?.legalName.firstName} ${profile?.legalName.lastName}`,
      cardKey: paymentMethod?.id,
      cardType: cardBrand as string,
      expireMonth: card?.exp_month as number,
      expireYear: card?.exp_year as number,
      numberLastFour: card?.last4 as string,
      isActive: true,
      patientId: profile?.id,
      isPrimary: !existingCards?.length,
      ...(isCall ? extraFields : {}),
    }

    return addCreditCardAction({
      payload,
      headers:null,
      isUnAuthenticated,
      shortUrlReference: shortUrlReference as string,
    })
  }

  const onSuccess = () => {
    router.refresh()
    onFormClose?.()
  }

  return (
    <ToggleableForm
      isCreditCard
      isCall={isCall}
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
      {!isCall && <FormHeading title="Add Card" />}
      <Flex gap="4" direction="column" className="w-full">
        <FormFieldContainer className="w-full">
          <Flex direction="column" gap="4">
            {isCall && (
              <Flex direction="column" gap="1">
                <FormFieldLabel required>Name on Card</FormFieldLabel>
                <TextFieldInput
                  placeholder="Enter name on card"
                  size="3"
                  {...form.register('name', {
                    required: 'Name on card is required',
                    minLength: {
                      value: 2,
                      message: 'Name on card must be at least 2 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name on card must not exceed 50 characters',
                    },
                  })}
                  className="w-full"
                />
              </Flex>
            )}
            <Flex
              direction="column"
              gap="1"
              className={cn(!isCall && 'w-full md:w-5/12')}
            >
              <FormFieldLabel required>
                {isCall && 'Credit'} Card Number
              </FormFieldLabel>
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
            </Flex>
            {isCall && (
              <PlacesAutocomplete
                name="primary"
                label="Primary"
                isFieldsRequired={true}
                showPostal={false}
                isCall
              />
            )}
          </Flex>
        </FormFieldContainer>
      </Flex>
    </ToggleableForm>
  )
}

export default CardForm
