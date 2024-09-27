import { CreditCard } from '@/types'
import { PaymentCardView } from './payment-cards-view'

interface PaymentCardsProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  patientCards:CreditCard[]
}
const PaymentCardsTab = ({
  stripeApiKey,
  patientId,
  googleApiKey,
  patientCards
}: PaymentCardsProps) => {
  return (
    <PaymentCardView
      stripeApiKey={stripeApiKey}
      patientId={patientId}
      googleApiKey={googleApiKey}
      patientCards={patientCards}
    />
  )
}

export { PaymentCardsTab }
