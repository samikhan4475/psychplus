import * as api from '@psychplus-v2/api'
import { type NetworkResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

const STRIPE_PUBLISHABLE_API_KEY_TAG = 'stripePublishableApiKey'

interface MetadataConfigurationApiResponse {
  configuration: [
    {
      display: string
      tag: string
      value: string
    },
  ]
}

const getStripeApiKey = async (): Promise<NetworkResult<string>> => {
  const result = await api.GET<MetadataConfigurationApiResponse>(
    `${API_URL}/api/metadata/configuration/protected`,
    {
      next: {
        revalidate: 10800, // 3 hours
      },
    },
  )

  if (result.state === 'error') {
    return result
  }

  const stripePublishableApiKey = result.data.configuration.find(
    (config) => config.tag === STRIPE_PUBLISHABLE_API_KEY_TAG,
  )?.value

  if (!stripePublishableApiKey) {
    console.error(
      'stripe publishable api key not found in metadata configuration',
    )

    return {
      state: 'error',
      error: 'Something went wrong!',
      headers: result.headers,
    }
  }

  return {
    state: 'success',
    data: stripePublishableApiKey,
    headers: result.headers,
  }
}

export { getStripeApiKey }
