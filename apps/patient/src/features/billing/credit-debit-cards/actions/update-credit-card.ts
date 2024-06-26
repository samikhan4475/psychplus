'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { CreditCard } from '@/features/billing/credit-debit-cards/types'

const UpdateCreditCardAction = async (
  creditCard: CreditCard,
): Promise<ActionResult<void>> => {
  const result = await api.PUT(
    `${API_URL}/api/patients/self/creditcards/${creditCard.id}`,
    creditCard,
  )

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

export { UpdateCreditCardAction }
