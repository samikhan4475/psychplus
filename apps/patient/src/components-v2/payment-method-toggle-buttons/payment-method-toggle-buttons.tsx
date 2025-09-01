'use client'

import AuthenticatedPaymentMethodToggle from './payment-method-toggle-authenticated'
import UnauthenticatedPaymentMethodToggle from './payment-method-toggle-unauthenticated'
import { PaymentMethodToggleButtonProps } from './types'

const PaymentMethodToggleButtons = ({
  value,
  onChange,
  disableInsurance,
  isCall = false,
  isUnAuthenticated = false,
}: PaymentMethodToggleButtonProps) => {
  if (isUnAuthenticated) {
    return (
      <UnauthenticatedPaymentMethodToggle
        value={value}
        onChange={onChange}
        disableInsurance={disableInsurance}
        isCall={isCall}
      />
    )
  }

  return (
    <AuthenticatedPaymentMethodToggle
      value={value}
      onChange={onChange}
      disableInsurance={disableInsurance}
      isCall={isCall}
    />
  )
}
export { PaymentMethodToggleButtons }
