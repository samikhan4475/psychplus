'use server'

import * as api from '@/api'

const getFeatureFlagAction = async (
  shortName: string,
): Promise<api.ActionResult<boolean>> => {
  const response = await api.POST<boolean>(
    api.GET_FEATURE_FLAGS_BY_SHORTNAME_ENDPOINT(shortName),
  )

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

export { getFeatureFlagAction }
