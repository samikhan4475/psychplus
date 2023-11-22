import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'

interface LoginRequest {
  username: string
  password: string
}

const login = async (request: LoginRequest) =>
  handleRequest<void>(
    fetch(forwardQuery('/api/login'), {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  )

export { login }
