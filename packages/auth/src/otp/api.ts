import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface OtpRequest {
  emailAddress?: string
  phoneNumber?: string
}

const sendOtp = async (request: OtpRequest) =>
  handleRequest<void>(
    fetch('/api/users/signup/otp', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

export { sendOtp }
