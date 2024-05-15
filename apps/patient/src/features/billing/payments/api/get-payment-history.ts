import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PaymentHistoryItem } from '@/features/billing/payments/types'

const getPaymentHistory = () =>
  api.GET<PaymentHistoryItem[]>(`${API_URL}/api/patients/self/transactions`)

export { getPaymentHistory }
