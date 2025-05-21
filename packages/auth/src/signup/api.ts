import {
  type ContactInfo,
  type Guardian,
  type Name,
  type User,
} from '@psychplus/user'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface SignupRequest {
  otpCode: string
  legalName: Name
  dateOfBirth: string
  gender?: string
  socialSecurityNumber?: string
  userRoleId?: number
  contactInfo: ContactInfo
  language?: [string]
  preferredLanguage?: string
  emergencyContact?: ContactInfo
  guardian?: Guardian
  password: string
  passwordConfirm: string
  referralSource?: string
  referralName?: string
  hipaaConsentOn?: string
  termsOfServiceConsentOn?: string
  privacyPolicyConsentOn?: string
  aboutPatientDescription?: string
}

type SignupResponse = {
  accessToken: string
  user: User
}

const signup = async (request: SignupRequest): Promise<SignupResponse> =>
  handleRequest<SignupResponse>(
    fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

export { signup }
