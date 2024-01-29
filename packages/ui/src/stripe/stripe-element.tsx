import { Elements } from '@stripe/react-stripe-js'
import useStripe from './hooks'

interface StripeElementProps {
  children: React.ReactNode
}
const StripeElement = ({ children }: StripeElementProps) => {
  const { stripePromise } = useStripe()
  return <Elements stripe={stripePromise}>{children}</Elements>
}

export { StripeElement }
