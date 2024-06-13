import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface Response {
  id: number
  avatar?: string
  legalName: {
    firstName: string
    lastName: string
    honors: string
  }
}

interface Provider {
  id: number
  avatar: string | undefined
  firstName: string
  lastName: string
  fullName?: string
  title?: string
  honors?: string
}

const getAdministrator = async (input: string): Promise<Provider[]> => {
  const res = await handleRequest<Response[]>(
    fetch('/galaxy/api/staff/search?limit=10', {
      method: 'POST',
      body: JSON.stringify({
        name: input,
        roleCodes: ['1'],
      }),
      headers: createHeaders(),
    }),
  )
  return res.map((user) => ({
    id: user.id,
    avatar: user.avatar,
    firstName: user.legalName.firstName,
    lastName: user.legalName.lastName,
    honors: user.legalName.honors,
  }))
}

const getProviders = async (input: string): Promise<Provider[]> => {
  const res = await handleRequest<Response[]>(
    fetch('/galaxy/api/staff/search?limit=10', {
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

export { getProviders, getAdministrator, type Provider }
