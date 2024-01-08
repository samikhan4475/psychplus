import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Provider } from './types'

interface Response {
  id: number
  avatar?: string
  legalName: {
    firstName: string
    lastName: string
    honors: string
  }
}

const getProviders = async (input: string): Promise<Provider[]> => {
  const res = await handleRequest<Response[]>(
    fetch('/api/staff/search?limit=10', {
      method: 'POST',
      body: JSON.stringify({
        name: input,
        roleCodes: ['1'],
      }),
      headers: createHeaders(),
    }),
  )

  return res.map((provider) => ({
    id: provider.id,
    avatar: provider.avatar,
    firstName: provider.legalName.firstName,
    lastName: provider.legalName.lastName,
    honors: provider.legalName.honors,
  }))
}

export { getProviders, type Provider }
