import { PaymentType } from '@psychplus-v2/constants'

interface PaymentMethodToggleButtonProps {
  value: PaymentType
  onChange: (value: PaymentType) => void
  disableInsurance: boolean
  isCall?: boolean
  isUnAuthenticated?: boolean
}

export { type PaymentMethodToggleButtonProps }
