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
  isActive: boolean
  patientId: number
  isPrimary: boolean
}

const addCreditCardAction = async ({
  ...params
}: AddCreditCardParams): Promise<ActionResult<void>> => {
  const result = await api.POST(`${API_URL}/api/patients/self/creditcards`, {
    ...params,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: extractErrorMessage(result.error),
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

const extractErrorMessage = (error: string): string => {
  const patterns = [/Internal server error: \(StripeException\)\s*/]

  for (const pattern of patterns) {
    error = error.replace(pattern, '')
  }

  return error.trim()
}

export { addCreditCardAction }
