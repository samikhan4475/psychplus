'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'

const getProvidersOptionsAction = async (): Promise<
  { label: string; value: string }[]
> => {
  const body = {
    roleCodes: ['1'],
  }
  const response = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, body)

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const transformedData = response.data.map((data) => ({
    label: `${data.legalName.firstName} ${data.legalName.lastName}`,
    value: String(data.id),
  }))

  return transformedData
}

export { getProvidersOptionsAction }
