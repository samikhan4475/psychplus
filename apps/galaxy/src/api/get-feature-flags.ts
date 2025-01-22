import * as api from '@/api'
import { FeatureFlag, FeatureFlagProps } from '@/types/feature-flag'

const getFeatureFlags = async (payload: FeatureFlagProps) => {
  const response = await api.POST<FeatureFlag[]>(api.FEATURE_FLAGS, payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const result = response.data
    .filter((featureFlag) => featureFlag.environments[0].isEnabledDefault)
    .map((featureFlag) => featureFlag.shortName)
  return {
    state: 'success',
    data: result || [],
  }
}

export { getFeatureFlags }
