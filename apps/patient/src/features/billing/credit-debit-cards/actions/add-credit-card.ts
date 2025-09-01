'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface AddCreditCardParams {
  payload: {
    name?: string
    cardKey: string
    cardType: string
    numberLastFour: string
    expireMonth: number
    expireYear: number
    isActive: boolean
    patientId?: number
    isPrimary: boolean
    billingAddress?: {
      street1: string
      street2?: string
      city: string
      state: string
      country?: string
      postalCode: string
      postalPlus4Code?: string
    }
  }
  headers: HeadersInit | null
  isUnAuthenticated?: boolean
  shortUrlReference?: string
}

const addCreditCardAction = async ({
  payload,
  headers,
  isUnAuthenticated = false,
  shortUrlReference = '',
}: AddCreditCardParams): Promise<ActionResult<void>> => {
  const baseUrl = `${API_URL}/api/patients/self/creditcards`
  const url = isUnAuthenticated ? `${baseUrl}/${shortUrlReference}` : baseUrl
  const result = await api.POST(
    url,
    {
      ...payload,
    },
    headers ? { headers }: {},
  )

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
