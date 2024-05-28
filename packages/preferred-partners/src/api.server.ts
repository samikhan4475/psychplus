// @ts-ignore
import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type {
  CreatePreferredPartnerPatientPayload,
  PreferredPartner,
  PreferredPartnerPatient,
  PreferredPartnerPayload,
  PreferredPartnerWorklist,
} from './types'

const getPreferredPartners = (
  partnerIds: PreferredPartnerPayload,
): Promise<PreferredPartner> =>
  handleRequest(
    fetch(`${API_URL}/api/preferredpartners/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        partnerIds: partnerIds || [],
        IncludeStatistics: true,
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const createPreferredPartners = (
  preferredPartner: PreferredPartner,
): Promise<PreferredPartner> =>
  handleRequest(
    fetch(`${API_URL}/api/preferredpartners`, {
      method: 'POST',
      body: JSON.stringify(preferredPartner),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const fetchPreferredPartnerPatient = (
  partnerId: string,
  payload?: any,
): Promise<PreferredPartnerPatient[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/preferredpartners/${partnerId}/partnerpatients/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const fetchPreferredPartnerUserWorklist = (
  partnerId: string,
  payload?: any,
): Promise<PreferredPartnerWorklist[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/preferredpartners/${partnerId}/worklists/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const reconcilePreferredPartnerUserWorklist = (
  partnerId: string,
  worklistId: string,
  payload?: Partial<PreferredPartnerWorklist>,
) => {
  handleRequest(
    fetch(
      `${API_URL}/api/preferredpartners/${partnerId}/worklists/${worklistId}`,
      {
        method: 'POST',
        body: JSON.stringify(payload || {}),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const createPreferredPartnerPatient = (
  partnerId: number,
  payload: CreatePreferredPartnerPatientPayload,
): Promise<CreatePreferredPartnerPatientPayload> => {
  return handleRequest(
    fetch(`${API_URL}/api/preferredpartners/${partnerId}/partnerpatients`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}
const getPreferredPartnersCached = cache(getPreferredPartners)
export {
  getPreferredPartnersCached as getPreferredPartners,
  createPreferredPartners,
  fetchPreferredPartnerPatient,
  fetchPreferredPartnerUserWorklist,
  reconcilePreferredPartnerUserWorklist,
  createPreferredPartnerPatient,
}
