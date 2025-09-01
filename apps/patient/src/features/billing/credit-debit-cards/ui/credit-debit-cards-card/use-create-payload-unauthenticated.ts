'use client'

import { PaymentMethodResult } from '@stripe/stripe-js'
import { UseFormReturn } from 'react-hook-form'
import { CreditCard } from '../../types'

interface UnAuthenticatedPayloadParams {
  isCall: boolean
  form: UseFormReturn
  existingCards?: CreditCard[]
  stripeResult: PaymentMethodResult
}

export const useCreatePayloadUnAuthenticated = () => {
  const unAuthenticatedPayload = ({
    isCall,
    form,
    existingCards,
    stripeResult,
  }: UnAuthenticatedPayloadParams) => {
    const { paymentMethod } = stripeResult
    const card = paymentMethod?.card
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

    return {
      name: form.getValues('name'),
      cardKey: paymentMethod?.id as string,
      cardType: cardBrand as string,
      expireMonth: card?.exp_month as number,
      expireYear: card?.exp_year as number,
      numberLastFour: card?.last4 as string,
      isActive: true,
      isPrimary: !existingCards?.length,
      ...(isCall ? extraFields : {}),
    }
  }

  return { unAuthenticatedPayload }
}
