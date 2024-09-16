'use client'

import * as api from '@/api'
import { Insurance } from '../types'

const getPatientInsurnacesAction = async (): Promise<
  api.ActionResult<Insurance[]>
> => {
  const response = await mockFetchPatientInsurances()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data || [],
  }
}

const mockFetchPatientInsurances = async (): Promise<
  api.NetworkResult<Insurance[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            id: 'b9ad736f-a374-45b9-bc02-2ddf00251977',
            insurancePlanId: '6c593e1e-1469-4d78-3d00-08dbf042c7de',
            verificationStatus: 'Pending',
            isActive: true,
            isDeleted: false,
            memberId: 'fsdfsdfsdf',
            groupNumber: 'ssfa',
            effectiveDate: '2024-09-13T00:00:00Z',
            terminationDate: '2024-09-19T00:00:00Z',
            insurancePolicyPriority: 'Primary',
            hasCardFrontImage: true,
            hasCardBackImage: true,
            isPatientPolicyHolder: false,
            policyHolderRelationship: 'Child',
            policyHolderName: {
              firstName: 'Njnkn',
              lastName: 'M ,n',
            },
            policyHolderDateOfBirth: '2006-09-07T00:00:00Z',
            policyHolderSocialSecurityNumber: '897798989',
            policyHolderGender: 'Male',
            policyName: 'Aetna-HMO',
            payerName: 'Aetna',
          },
          {
            id: '9b3105fd-f38e-4eb5-be3b-a271d22a6ea1',
            insurancePlanId: 'e04a4c69-01be-4202-3cff-08dbf042c7de',
            verificationStatus: 'Pending',
            isActive: true,
            isDeleted: false,
            memberId: 'fsdfsdfsdf',
            groupNumber: 'ssfa',
            effectiveDate: '2024-09-11T00:00:00Z',
            terminationDate: '2024-09-17T00:00:00Z',
            insurancePolicyPriority: 'Secondary',
            hasCardFrontImage: true,
            hasCardBackImage: true,
            isPatientPolicyHolder: true,
            policyName: 'Aetna-EPO',
            payerName: 'Aetna',
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientInsurnacesAction }
