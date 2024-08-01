import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { Claim } from './types'

const defaultPayLoad = {
  dateType: 'DateOfService',
  fromDate: new Date(),
  toDate: new Date(),
}

const getClaimsList = (): Promise<Claim[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/claims/actions/search`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(defaultPayLoad),
      headers: createHeaders(),
    }),
  )
}

const getClaimsListCached = cache(getClaimsList)

export { getClaimsListCached as getClaimsList }
