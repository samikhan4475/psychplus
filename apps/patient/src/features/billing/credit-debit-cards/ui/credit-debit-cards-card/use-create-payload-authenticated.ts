'use client'

import { PaymentMethodResult } from '@stripe/stripe-js'
import { UseFormReturn } from 'react-hook-form'
import { useProfileStore } from '@/features/account/profile/store'
import { CreditCard } from '../../types'

interface AuthenticatedPayloadParams {
  isCall: boolean
  form: UseFormReturn
  existingCards?: CreditCard[]
  stripeResult: PaymentMethodResult
}

export const useCreatePayloadAuthenticated = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const authenticatedPayload = ({
    isCall,
    form,
    existingCards,
    stripeResult,
  }: AuthenticatedPayloadParams) => {
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
      name: isCall
        ? form.getValues('name')
        : `${profile.legalName.firstName} ${profile.legalName.lastName}`,
      cardKey: paymentMethod?.id as string,
      cardType: cardBrand as string,
      expireMonth: card?.exp_month as number,
      expireYear: card?.exp_year as number,
      numberLastFour: card?.last4 as string,
      isActive: true,
      patientId: profile.id,
      isPrimary: !existingCards?.length,
      ...(isCall ? extraFields : {}),
    }
  }

  return { authenticatedPayload }
}
