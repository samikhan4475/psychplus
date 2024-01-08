import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Insurance } from './types'

const getInsuranceByPayers = (
  includePlans = true,
  includeInactive = false,
  includeTest = true,
  offset = 0,
  limit = 0,
): Promise<Insurance[]> =>
  handleRequest(
    fetch(
      `/api/insurance/payers?includePlans=${includePlans}&includeInactive=${includeInactive}&includeTest=${includeTest}&offset=${offset}&limit=${limit}`,
      { headers: createHeaders() },
    ),
  )

export { getInsuranceByPayers }
