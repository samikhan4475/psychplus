'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface PostalCodeAPIResponse {
  statesInPostalCode: StateInfo[]
}

interface StateInfo {
  code: string
  displayName: string
}

const getZipcodeInfo = async (
  zipCode: string,
): Promise<ActionResult<StateInfo[]>> => {
  const url = new URL(`${API_URL}/api/postalcodes/${zipCode}/states`,)

  try {
    const result = await api.GET<PostalCodeAPIResponse>(url.toString())

    if (result.state === 'error') {
      return { state: 'error', error: result.error }
    }

    if (!result.data.statesInPostalCode.length) {
      return { state: 'error', error: 'No states found for this ZIP code' }
    }

    return {
      state: 'success',
      data: result.data.statesInPostalCode,
    }
  } catch (error) {
    return { state: 'error', error: 'Failed to fetch ZIP code info' }
  }
}

export { getZipcodeInfo }
