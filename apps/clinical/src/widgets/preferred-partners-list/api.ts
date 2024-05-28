import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Filters } from './store'
import { PreferredPartner } from './types'

const getPreferredPartners = (payload?: Filters): Promise<PreferredPartner[]> =>
  handleRequest(
    fetch(`/api/preferredpartners/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getPreferredPartners }
