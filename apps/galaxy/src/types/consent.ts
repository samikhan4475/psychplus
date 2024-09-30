enum NotificationType {
  All = 'All',
  MobilePush = 'MobilePush',
  Sms = 'Sms',
  SmsFallback = 'SmsFallback',
  Email = 'Email',
  EmailFallback = 'EmailFallback',
}

enum VerificationStatus {
  Pending = 'Pending',
  Verified = 'Verified',
  Unverifiable = 'Unverifiable',
}

enum ConsentStatus {
  Yes = 'Yes',
  No = 'No',
  Pending = 'Pending',
}
enum Policy {
  PolicyA = 'PolicyA',
  PolicyB = 'PolicyB',
}
interface PatientConsent {
  id: string
  patientId: string
  policyDescription?: string
  type: string
  organizationPractice?: string
  signatureName?: string
  guardianSignature?: string
  issuanceDate: string
  signingDate: string
  latestIssuanceDate: string
  verificationStatus?: VerificationStatus // Updated to use the enum
  status?: ConsentStatus
  isNeedsNewSignature: boolean
  consents?: PatientConsent[]
}

export {
  NotificationType,
  ConsentStatus,
  VerificationStatus,
  Policy,
  type PatientConsent,
}
