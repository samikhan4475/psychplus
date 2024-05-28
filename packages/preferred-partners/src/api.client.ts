import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type {
  CreatePreferredPartnerPatientPayload,
  PreferredPartner,
  PreferredPartnerPatient,
  PreferredPartnerWorklist,
} from './types'

const getPreferredPartners = (): Promise<PreferredPartner> =>
  handleRequest(
    fetch(`/api/preferredpartners/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        partnerIds: [],
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
    fetch(`/api/preferredpartners`, {
      method: 'POST',
      body: JSON.stringify(preferredPartner),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updatePreferredPartner = (
  preferredPartner: PreferredPartner,
  preferredPartnerId: string,
): Promise<PreferredPartner> =>
  handleRequest(
    fetch(`/api/preferredpartners/${preferredPartnerId}`, {
      method: 'PUT',
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
      `/api/preferredpartners/${partnerId}/partnerpatients/actions/search`,
      {
        method: 'POST',
        body: JSON.stringify(payload || undefined),
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
    fetch(`/api/preferredpartners/${partnerId}/worklists/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload || undefined),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const reconcilePreferredPartnerUserWorklist = (
  partnerId: string,
  worklistId: string,
  payload?: Partial<PreferredPartnerWorklist>,
): Promise<PreferredPartnerWorklist> =>
  handleRequest(
    fetch(`/api/preferredpartners/${partnerId}/worklists/${worklistId}`, {
      method: 'POST',
      body: JSON.stringify(payload || undefined),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createPreferredPartnerPatient = (
  partnerId: string,
  payload: CreatePreferredPartnerPatientPayload,
): Promise<CreatePreferredPartnerPatientPayload> => {
  return handleRequest(
    fetch(`/api/preferredpartners/${partnerId}/partnerpatients`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

export {
  getPreferredPartners,
  createPreferredPartners,
  updatePreferredPartner,
  fetchPreferredPartnerPatient,
  fetchPreferredPartnerUserWorklist,
  reconcilePreferredPartnerUserWorklist,
  createPreferredPartnerPatient,
}
