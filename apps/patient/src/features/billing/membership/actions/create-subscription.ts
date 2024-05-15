'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { STRIPE_API_KEY } from '@psychplus-v2/env'
import Stripe from 'stripe'

const priceId = 'price_1LblJ5H92JPcQP3j1t4kM2O2'

const stripe = new Stripe(STRIPE_API_KEY)

type CreateSubscriptionParams = {
  customerId: string
  payment_method: string
}

const createSubscriptionAction = async ({
  customerId,
  payment_method,
}: CreateSubscriptionParams): Promise<ActionResult<Stripe.Subscription>> => {
  try {
    const result = await stripe.subscriptions.create({
      customer: customerId,
      default_payment_method: payment_method,
      items: [
        {
          price: priceId,
        },
      ],
      collection_method: 'charge_automatically',
      payment_behavior: 'error_if_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    return {
      state: 'success',
      data: result,
    }
  } catch (error) {
    return {
      state: 'error',
      error: 'Failed to create subscription.',
    }
  }
}

export { createSubscriptionAction }
