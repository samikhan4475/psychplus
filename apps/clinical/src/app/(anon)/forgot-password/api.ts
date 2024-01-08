import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface ForgotPasswordRequest {
  emailAddress: string
}

const forgotPassword = (request: ForgotPasswordRequest): Promise<void> =>
  handleRequest(
    fetch('/api/users/self/forgotpassword', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

export { forgotPassword }
