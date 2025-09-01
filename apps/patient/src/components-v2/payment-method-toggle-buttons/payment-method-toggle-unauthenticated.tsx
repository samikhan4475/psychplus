import { PaymentType } from '@psychplus-v2/constants'
import PaymentMethodToggle from './payment-method-toggle'
import { PaymentMethodToggleButtonProps } from './types'

const UnauthenticatedPaymentMethodToggle = ({
  value,
  onChange,
  disableInsurance,
}: PaymentMethodToggleButtonProps) => {
  const options = [PaymentType.Insurance, PaymentType.SelfPay]

  return (
    <PaymentMethodToggle
      value={value}
      onChange={onChange}
      disableInsurance={disableInsurance}
      isCall
      options={options}
    />
  )
}

export default UnauthenticatedPaymentMethodToggle
