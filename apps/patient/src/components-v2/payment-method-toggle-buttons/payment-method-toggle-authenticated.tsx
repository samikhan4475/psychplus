import { PaymentType } from '@psychplus-v2/constants'
import { useProfileStore } from '@/features/account/profile/store'
import PaymentMethodToggle from './payment-method-toggle'
import { PaymentMethodToggleButtonProps } from './types'

const AuthenticatedPaymentMethodToggle = ({
  value,
  onChange,
  disableInsurance,
  isCall,
}: PaymentMethodToggleButtonProps) => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const isPreferredPartnerAllowed =
    !!profile?.preferredPartnerUserWorklist?.length

  const options = [
    PaymentType.Insurance,
    PaymentType.SelfPay,
    ...(!isCall && isPreferredPartnerAllowed ? [PaymentType.PreferredPartner] : []),
  ]

  return (
    <PaymentMethodToggle
      value={value}
      onChange={onChange}
      disableInsurance={disableInsurance}
      options={options}
      isCall={isCall}
    />
  )
}

export default AuthenticatedPaymentMethodToggle
