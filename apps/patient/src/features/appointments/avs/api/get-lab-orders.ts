'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { LabOrder } from '../types'

const defaultPayload = {
  IsIncludeLocations: true,
  IsIncludeLabs: true,
  IsIncludeResults: true,
  IsIncludeTests: true,
}

const getLabOrdersAction = async () => {
  const result = await api.POST<LabOrder[]>(
    `${API_URL}/api/patients/self/laborders/actions/search`,
    {
      ...defaultPayload,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getLabOrdersAction }
