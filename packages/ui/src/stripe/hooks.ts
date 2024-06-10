import { useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { ConfigurationProtected } from '@psychplus/metadata'
import { getConfigurationProtected } from '@psychplus/metadata/api.client'

// import { STRIPE_PUBLISHABLE_KEY } from '@psychplus/utils/constants'

export const useStripe = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    Promise.resolve(null),
  )

  useEffect(() => {
    getConfigurationProtected().then(
      (configuration: ConfigurationProtected) => {
        const stripePublishableKey = configuration.configuration.find(
          (c) => c.tag === 'stripePublishableApiKey',
        )

        const newStripePromise = loadStripe(stripePublishableKey?.value ?? '')
        setStripePromise(newStripePromise)
      },
    )
  }, [])

  return { stripePromise }
}
