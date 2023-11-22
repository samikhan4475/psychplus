import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'

interface ForgotPasswordRequest {
  emailAddress: string
}

const forgotPassword = (request: ForgotPasswordRequest): Promise<void> =>
  handleRequest(
    fetch(forwardQuery('/api/users/self/forgotpassword'), {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  )

export { forgotPassword }
