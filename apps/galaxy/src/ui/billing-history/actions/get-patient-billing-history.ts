'use client'

import * as api from '@/api'
import { BillingFilterSchemaType } from '../filter-form'
import type { BillingHistory, GetBillingHistoryData } from '../types'

const getPatientBillingHistoryAction = async ({
  ...rest
}: Partial<BillingFilterSchemaType>): Promise<
  api.ActionResult<GetBillingHistoryData>
> => {
  const response = await mockFetchPatientBillingHistory()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  
  return {
    state: 'success',
    data: {
      billingHistories: response.data,
    },
  }
}

const mockFetchPatientBillingHistory = async (): Promise<
  api.NetworkResult<BillingHistory[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [...Array(20)].map(() => ({
          visit: `165272278`,
          dateTime: '03/12/24 00:00',
          location: 'Willow brook',
          visitType: 'Est, Out-patient',
          provider: 'John Smith, MD',
          coSigner: '',
          primaryIns: 'Aetna',
          secondaryIns: 'Medicare',
          financial: '',
          diagnosis: '',
          cptCodes: '',
          schedulingStatus: '',
          verification: '',
          billingStatus: '',
          cmd: '',
          sign: '',
        })),
      })
    }, 2000)
  })
}

export { getPatientBillingHistoryAction }
