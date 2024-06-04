import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { CreditCard } from '@/features/billing/credit-debit-cards/types'

const getCreditCards = () =>
  api.GET<CreditCard[]>(`${API_URL}/api/patients/self/creditcards`)

export { getCreditCards }
