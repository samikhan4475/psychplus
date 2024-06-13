'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface AddCreditCardParams {
  name?: string
  cardKey: string
  cardType: string
  numberLastFour: string
  expireMonth: number
  expireYear: number
  postalCode: string
  address: string
  city: string
  state: string
  isPrimary: boolean
}

const addCreditCardAction = async ({
  name,
  postalCode,
  address,
  city,
  state,
  ...params
}: AddCreditCardParams): Promise<ActionResult<void>> => {
  if (!name) {
    name = `${params.cardType}:${params.numberLastFour}`
  }

  const result = await api.POST(`${API_URL}/api/patients/self/creditcards`, {
    ...params,
    isActive: true,
    name,
    billingAddress: {
      type: 'Billing',
      street1: address,
      postalCode,
      city,
      state,
    },
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { addCreditCardAction }
