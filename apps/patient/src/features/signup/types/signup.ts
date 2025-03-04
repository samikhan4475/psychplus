import { ContactDetails, LegalName } from '@psychplus-v2/types'

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

export type { SignupUserParams }
