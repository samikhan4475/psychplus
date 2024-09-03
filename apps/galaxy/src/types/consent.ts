interface PatientConsent {
  id: number
  patientId: number
  type: string
  signatureName: string
  guardianSignature: string
  issuanceDate: string
  signingDate: string
  latestIssuanceDate: string
  isNeedsNewSignature: boolean
}

export { type PatientConsent }
