import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { Claim, InsurancePayer, Location } from './types'

const defaultPayLoad = {
  isIncludePatientInsurancePlan: false,
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

const getInsurancePayersList = (): Promise<InsurancePayer[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/insurance/payers`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const getLocations = (): Promise<Location[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/clinics`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const getClaimsListCached = cache(getClaimsList)
const getInsurancePayersListCached = cache(getInsurancePayersList)
const getLocationsCached = cache(getLocations)

export {
  getClaimsListCached as getClaimsList,
  getInsurancePayersListCached as getInsurancePayersList,
  getLocationsCached as getLocations,
}
