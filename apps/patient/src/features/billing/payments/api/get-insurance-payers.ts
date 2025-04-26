import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { InsurancePayer } from '../types/insurance'

const getInsurancePayers = () =>
  api.GET<InsurancePayer[]>(
    `${API_URL}/api/insurance/payers?includePlans=true&includeInactive=false&includeTest=false&publicViewable=true&offset=0&limit=0`,
    {
      next: {
        revalidate: 3600,
      },
    },
  )

export { getInsurancePayers }
