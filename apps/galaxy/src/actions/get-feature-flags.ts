'use server'

import * as api from '@/api'
import { FeatureFlag, FeatureFlagProps } from '@/types/feature-flag'

const getFeatureFlagsAction = async (
  payload: FeatureFlagProps,
): Promise<api.ActionResult<FeatureFlag[]>> => {
  const response = await api.POST<FeatureFlag[]>(api.FEATURE_FLAGS, payload)

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

export { getFeatureFlagsAction }
