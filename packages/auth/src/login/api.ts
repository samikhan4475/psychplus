import { handleRequest } from '@psychplus/utils/api'

interface LoginRequest {
  username: string
  password: string
  basePath: string
}

const login = async (request: LoginRequest) =>
  handleRequest<void>(
    fetch(`${request.basePath}/api/login`, {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  )

export { login }
