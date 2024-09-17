'use client'

import * as api from '@/api'
import { PaymentFilterSchemaType } from '../filter-form'
import type { GetPaymentHistoryData, PaymentHistory } from '../types'

const getPatientPaymentHistoriesAction = async ({
  ...rest
}: Partial<PaymentFilterSchemaType>): Promise<
  api.ActionResult<GetPaymentHistoryData>
> => {
  const response = await mockFetchPatientPatientPaymentHistory()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      paymentHistories: response.data,
    },
  }
}

const mockFetchPatientPatientPaymentHistory = async (): Promise<
  api.NetworkResult<PaymentHistory[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [...Array(10)].map(() => ({
          hx: '',
          date: '01/18/2023',
          time: '00:00:00',
          charge: '',
          visit: '00000869-00491',
          method: '',
          paymentDescription: '--',
          description: 'Est Pt, Outpatient Office Visit',
          transaction: '12636737377888',
          stripe: '1263673',
          updatedBy: 'Dr. Will Smith',
          updatedDate: '01/29/24 10:58',
          coPay: {
            due: '$150.00',
            paid: '$150.00',
          },
          coIns: {
            due: '$150.00',
            paid: '$150.00',
          },
          subRows: [...Array(2)].map((_, key) => ({
            hx: '',
            date: '01/18/2023',
            time: '00:00:00',
            charge: '',
            visit: '00000869-00491',
            method: '',
            paymentDescription: '--',
            description: 'Est Pt, Outpatient Office Visit',
            transaction: '12636737377888',
            stripe: '1263673',
            updatedBy: 'Dr. Will Smith',
            updatedDate: '01/29/24 10:58',
            coPay: {
              due: '$150.00',
              paid: '$150.00',
            },
            coIns: {
              due: '$150.00',
              paid: '$150.00',
            },
          })),
        })),
      })
    }, 2000)
  })
}

export { getPatientPaymentHistoriesAction }
