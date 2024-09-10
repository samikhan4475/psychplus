'use client'

import * as api from '@/api'
import { PolicyConsentFilterSchemaType } from '../filter-form'
import type { GetPolicyConsentsData, PolicyConsents } from '../types'

const getPatientPolicyAndConsetntAction = async ({
  ...rest
}: Partial<PolicyConsentFilterSchemaType>): Promise<
  api.ActionResult<GetPolicyConsentsData>
> => {
  const response = await mockFetchPatientPatientPolicyConsents()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      consents: response.data,
    },
  }
}

const mockFetchPatientPatientPolicyConsents = async (): Promise<
  api.NetworkResult<PolicyConsents[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            issuanceDate: '08/24/22',
            policyDescription: 'Customer initiation',
            policyType: 'A',
            signingDate: '08/24/22',
            status: 'yes',
            organizationPractice: 'Psychplus/Psychiatry of Texas',
          },
          {
            issuanceDate: '08/24/22',
            policyDescription: 'Patient initiation ',
            policyType: 'B',
            signingDate: '08/24/22',
            status: 'no',
            organizationPractice: 'Psychplus/Psychiatry of Texas',
          },
          {
            issuanceDate: '08/24/22',
            policyDescription: 'Member initiation',
            policyType: 'C',
            signingDate: '08/24/22',
            status: 'pending',
            organizationPractice: 'Psychplus/Psychiatry of Texas',
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientPolicyAndConsetntAction }
