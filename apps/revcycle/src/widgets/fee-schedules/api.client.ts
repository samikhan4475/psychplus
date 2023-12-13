import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'
import { Insurance } from './types'

const getInsuranceByPayers = (
  includePlans = true,
  includeInactive = false,
  includeTest = true,
  offset = 0,
  limit = 0,
): Promise<Insurance[]> =>
  handleRequest(
    fetch(
      forwardQuery(
        `/api/insurance/payers?includePlans=${includePlans}&includeInactive=${includeInactive}&includeTest=${includeTest}&offset=${offset}&limit=${limit}`,
      ),
    ),
  )

export { getInsuranceByPayers }
