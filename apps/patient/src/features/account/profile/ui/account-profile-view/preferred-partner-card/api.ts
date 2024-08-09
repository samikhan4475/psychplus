import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PreferredPartner } from '@psychplus-v2/types'

const getPreferredPartnerList = () =>
  api.GET<PreferredPartner[]>(`${API_URL}/api/patients/self/preferredpartners`)

export { getPreferredPartnerList }
