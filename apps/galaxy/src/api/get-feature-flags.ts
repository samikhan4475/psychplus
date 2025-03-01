import * as api from '@/api'
import { FLAG_EXPIRY_MS, MAIN_PAGE_FEATURE_FLAGS } from '@/constants'

const getFeatureFlags = async () => {
  const flagNames = Object.values(MAIN_PAGE_FEATURE_FLAGS)
  const now = Date.now()

  const responses = await Promise.allSettled(
    flagNames.map((shortName) =>
      api.POST<boolean>(api.GET_FEATURE_FLAGS_BY_SHORTNAME_ENDPOINT(shortName)),
    ),
  )

  const updatedFlags = flagNames.reduce<
    Record<string, { enabled: boolean; expiry: number }>
  >((acc, shortName, index) => {
    const result = responses[index]
    const isEnabled =
      result.status === 'fulfilled' && result.value.state === 'success'
        ? result.value.data
        : false

    acc[shortName] = { enabled: isEnabled, expiry: now + FLAG_EXPIRY_MS }
    return acc
  }, {})
  return {
    state: 'success',
    data: updatedFlags,
  }
}

export { getFeatureFlags }
