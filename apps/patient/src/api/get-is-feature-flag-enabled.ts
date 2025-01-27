import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { type FeatureFlags } from '@/constants'

const getIsFeatureFlagEnabled = async (featureFlagName: FeatureFlags) =>
  api.POST<boolean>(
    `${API_URL}/api/featureflags/${featureFlagName}/actions/enabled`,
    {},
  )

export { getIsFeatureFlagEnabled }
