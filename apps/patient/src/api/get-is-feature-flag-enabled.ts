import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { type FeatureFlags } from '@/constants'

const getIsFeatureFlagEnabled = async (
  featureFlagName: FeatureFlags,
  isUnAuthenticated?: boolean,
) => {
  let url = `${API_URL}/api/featureflags/${featureFlagName}/actions/enabled`

  if (isUnAuthenticated) {
    url += '/unauthenticated'
  }
  return api.POST<boolean>(url, {})
}

export { getIsFeatureFlagEnabled }
