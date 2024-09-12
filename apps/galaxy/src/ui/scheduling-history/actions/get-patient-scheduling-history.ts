'use client'

import * as api from '@/api'
import { SchedulingHistorySchemaType } from '../filter-form'
import type { GetSchedulingHistoryData, SchedulingHistory } from '../types'

const getPatientSchedulingHistoryAction = async ({
  ...rest
}: Partial<SchedulingHistorySchemaType>): Promise<
  api.ActionResult<GetSchedulingHistoryData>
> => {
  const response = await mockFetchPatientSchedulingHistory()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      schedulingHistories: response.data,
    },
  }
}

const mockFetchPatientSchedulingHistory = async (): Promise<
  api.NetworkResult<SchedulingHistory[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [...Array(20)].map(() => ({
          visitNumber: 165272278,
          id: 165278,
          dateOfService: '03/12/24',
          visitType: 'Hospital Care, Subsequent, In-Person',
          location: 'Willow Brook',
          visitStatus: 'Checked In',
          residingState: 'Texas',
          facilityAdmission: {
            id: 165278,
            admittingProvider: 'John Smith, MD',
            admitDateTime: '03/12/24 00:00',
            dischargeDate: '03/12/24',
            user: '',
            dateTime: '',
          },
          service: '',
          provider: 'John Smith, MD',
          providerType: 'Therapy',
          cosigner: '',
          dcDate: '',
          dcHospiceName: '',
          institutionalPractice: '',
          insurance: {
            primaryInsurance: 'Medicare',
            secondaryInsurance: 'Medicare',
            institutionalPractice: 'Medicare',
            professionalPractice: 'Medicare',
          },
          practice: '',
          organization: '',
          coPay: {
            due: '$20',
            paid: '$20',
          },
          coins: {
            due: '$20',
            paid: '$20',
          },
          balance: {
            due: '$20',
            paid: '$20',
          },
        })),
      })
    }, 2000)
  })
}

export { getPatientSchedulingHistoryAction }
