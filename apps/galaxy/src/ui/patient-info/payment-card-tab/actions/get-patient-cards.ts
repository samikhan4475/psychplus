import * as api from '@/api'
import { CreditCardType } from '@/constants'
import type { CreditCard } from '../types'

interface GetPatientCardsParams {
  patientId: string
}

const getPatientCards = async ({
  patientId,
}: GetPatientCardsParams): Promise<api.ActionResult<CreditCard[]>> => {
  const response = await mockFetchPatientAllergies()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

const mockFetchPatientAllergies = async (): Promise<
  api.NetworkResult<CreditCard[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            id: 1,
            patientId: 101,
            cardType: CreditCardType.Visa,
            name: 'John Doe',
            numberLastFour: '1234',
            isActive: true,
            expireMonth: 12,
            expireYear: 2025,
            billingAddress: {
              type: 'Home',
              street1: '123 Main St',
              city: 'New York',
              state: 'NY',
              country: 'USA',
              postalCode: '10001',
            },
            cardKey: 'abcd-efgh-1234',
            isPrimary: true,
          },
          {
            id: 2,
            patientId: 102,
            cardType: CreditCardType.MasterCard,
            name: 'Jane Smith',
            numberLastFour: '5678',
            isActive: true,
            expireMonth: 6,
            expireYear: 2024,
            billingAddress: {
              type: 'Mailing',
              street1: '456 Oak Ave',
              street2: 'Apt 3B',
              city: 'Los Angeles',
              state: 'CA',
              country: 'USA',
              postalCode: '90001',
            },
            cardKey: 'ijkl-mnop-5678',
            isPrimary: false,
          },
          {
            id: 3,
            patientId: 103,
            cardType: CreditCardType.AmericanExpress,
            name: 'Alice Johnson',
            numberLastFour: '9012',
            isActive: false,
            expireMonth: 11,
            expireYear: 2023,
            billingAddress: {
              type: 'Home',
              street1: '789 Maple Dr',
              city: 'Chicago',
              state: 'IL',
              country: 'USA',
              postalCode: '60601',
            },
            cardKey: 'qrst-uvwx-9012',
            isPrimary: true,
          },
          {
            id: 4,
            patientId: 104,
            cardType: CreditCardType.Discover,
            name: 'Robert Brown',
            numberLastFour: '3456',
            isActive: true,
            expireMonth: 5,
            expireYear: 2026,
            billingAddress: {
              type: 'Mailing',
              street1: '321 Pine St',
              street2: 'Suite 500',
              city: 'Houston',
              state: 'TX',
              country: 'USA',
              postalCode: '77001',
            },
            cardKey: 'yzab-cdef-3456',
            isPrimary: false,
          },
          {
            id: 5,
            patientId: 105,
            cardType: CreditCardType.Visa,
            name: 'Emma Wilson',
            numberLastFour: '7890',
            isActive: true,
            expireMonth: 9,
            expireYear: 2027,
            billingAddress: {
              type: 'Home',
              street1: '123 Elm St',
              city: 'San Francisco',
              state: 'CA',
              country: 'USA',
              postalCode: '94101',
            },
            cardKey: 'ghij-klmn-7890',
            isPrimary: true,
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientCards }
