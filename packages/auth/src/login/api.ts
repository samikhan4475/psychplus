import { handleRequest } from '@psychplus/utils/api'

interface LoginRequest {
  username: string
  password: string
}

const login = async (request: LoginRequest) =>
  handleRequest<void>(
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  )

export { login }
