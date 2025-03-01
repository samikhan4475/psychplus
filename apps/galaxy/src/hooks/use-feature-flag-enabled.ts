import { useEffect, useState } from 'react'
import { useStore } from '@/store'

const pendingFetches = new Set<string>()

export const useFeatureFlagEnabled = (shortName: string) => {
  const { checkFeatureFlag, fetchFeatureFlag, featureFlags } = useStore(
    (state) => ({
      checkFeatureFlag: state.checkFeatureFlag,
      fetchFeatureFlag: state.fetchFeatureFlag,
      featureFlags: state.featureFlags,
    }),
  )

  const cachedValue = checkFeatureFlag(shortName)

  const [enabled, setEnabled] = useState<boolean | undefined>(cachedValue)

  useEffect(() => {
    if (cachedValue !== undefined) return

    if (pendingFetches.has(shortName)) return

    pendingFetches.add(shortName)
    fetchFeatureFlag(shortName).then((value) => {
      setEnabled(value)
      pendingFetches.delete(shortName)
    })
  }, [cachedValue, shortName, fetchFeatureFlag])

  return enabled ?? featureFlags?.[shortName]?.enabled ?? false
}
