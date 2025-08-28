import { ContactDetails, LegalName } from '@psychplus-v2/types'
import { User } from '@psychplus/user'

interface SignupUserParams {
  legalName: LegalName
  dateOfBirth: string
  contactInfo: ContactDetails
  password: string
  confirmPassword: string
  otpCode: string
  guardian?: {
    name: LegalName
  }
  gender: string
  termsOfServiceConsentOn: string
  hipaaConsentOn: string
  privacyPolicyConsentOn: string
}

interface WebsiteSignupUserResponse {
  accessToken: string
  patientMrn: string
  patientStatus: string
  user: User
}

export type { SignupUserParams, WebsiteSignupUserResponse }
