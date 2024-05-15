'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { STRIPE_API_KEY } from '@psychplus-v2/env'
import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_API_KEY)

type CreatePaymentIntentParams = {
  customerId: string
  uiAmount: number
}

const createPaymentIntentAction = async ({
  customerId,
  uiAmount,
}: CreatePaymentIntentParams): Promise<ActionResult<Stripe.PaymentIntent>> => {
  try {
    const result = await stripe.paymentIntents.create({
      amount: uiAmount * 100,
      currency: 'usd',
      customer: customerId,
    })

    return {
      state: 'success',
      data: result,
    }
  } catch (error) {
    return {
      state: 'error',
      error: 'Failed to create payment.',
    }
  }
}

export { createPaymentIntentAction }
