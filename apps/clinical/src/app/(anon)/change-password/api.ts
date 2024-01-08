import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface ChangePasswordRequest {
  emailAddress: string
  newPassword: string
  confirmPassword: string
  resetCode: string
}

const changePassword = (request: ChangePasswordRequest): Promise<void> =>
  handleRequest(
    fetch('/api/users/self/forgotpassword', {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

export { changePassword }
