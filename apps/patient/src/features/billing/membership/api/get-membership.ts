import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Membership } from '@/features/billing/membership/types'

const getMembership = () =>
  api.GET<Membership>(`${API_URL}/api/users/self/membership?type=Plus`)

export { getMembership }
