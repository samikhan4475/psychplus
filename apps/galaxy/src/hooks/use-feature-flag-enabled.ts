import { FEATURE_FLAGS } from '@/constants'
import { useStore } from '@/store'

const useFeatureFlagEnabled = (featureFlag: FEATURE_FLAGS) => {
  const featureFlags = useStore((state) => state.featureFlags)
  return featureFlags?.includes(featureFlag) ?? false
}

export { useFeatureFlagEnabled }
