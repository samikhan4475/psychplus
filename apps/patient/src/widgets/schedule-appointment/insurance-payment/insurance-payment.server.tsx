import { unstable_noStore as noStore } from 'next/cache'
import { STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { InsurancePaymentClient } from './insurance-payment.client'

const InsurancePaymentServer = async () => {
  noStore()

  return <InsurancePaymentClient stripeApiKey={STRIPE_PUBLISHABLE_KEY} />
}

export { InsurancePaymentServer }
