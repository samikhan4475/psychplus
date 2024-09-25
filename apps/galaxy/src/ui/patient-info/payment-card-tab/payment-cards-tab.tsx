import { PaymentCardView } from './payment-cards-view'

interface PaymentCardsProps {
  stripeApiKey: string
  patientId: string
}
const PaymentCardsTab = ({ stripeApiKey, patientId }: PaymentCardsProps) => {
  return <PaymentCardView stripeApiKey={stripeApiKey} patientId={patientId} />
}

//Mock data

export { PaymentCardsTab }
