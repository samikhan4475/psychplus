import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import {
  EDIItem,
  InsurancePayer,
  ReceiverItem,
} from './clearing-house-insurance-plan-edi/components/types'
import { RaceAndEthnicityCodeSet } from './types'

const eidPayload = {
  isIncludeInsurancePlan: true,
  isIncludeClearingHouseReceiver: true,
  recordStatuses: ['Active'],
}

const getUsStatesCodeSets = (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/psychpluspublic/codesets/UsStates`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getClearingHouseReceiversData = async (
  offset = 0,
  limit = 0,
  body = {},
): Promise<ReceiverItem[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/clearinghousereceivers/actions/search?offset=${offset}&limit=${limit}`,
      {
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify(body),
      },
    ),
  )

const getInsurancePayerData = async (): Promise<InsurancePayer[]> =>
  handleRequest(
    fetch(`${API_URL}/api/insurance/payers?includePlans=true`, {
      headers: createHeaders(),
      method: 'GET',
    }),
  )

const getEDIData = async (): Promise<EDIItem[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/integrationconfiguration/insuranceplans/actions/search`,
      {
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify(eidPayload),
      },
    ),
  )

const getUsStatesCodeSetsCached = cache(getUsStatesCodeSets)
const getClearingHouseReceiversDataCached = cache(getClearingHouseReceiversData)
const getInsurancePayerDataCached = cache(getInsurancePayerData)
const getEDIDataCached = cache(getEDIData)

export {
  getUsStatesCodeSetsCached as getUsStatesCodeSets,
  getClearingHouseReceiversDataCached as getClearingHouseReceiversData,
  getInsurancePayerDataCached as getInsurancePayerData,
  getEDIDataCached as getEDIData,
}
