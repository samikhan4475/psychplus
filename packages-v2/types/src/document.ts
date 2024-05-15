interface Document {
  name: string
  url: string
  content: string
}

enum DocumentType {
  PRIVACY_POLICY = 'privacypolicy',
  TERMS_AND_CONDITIONS = 'termsandconditions',
  PATIENT_SERVICE_AGREEMENT = 'serviceagreement',
  PRIVACY_PRACTICE = 'hipaaconsent',
  CONSENT_FOR_TREATMENT = 'treatmentconsent',
  MEMBERSHIP_TERMS_SERVICE = 'membershipagreement',
  EULA = 'eula',
  ABA_SERVICE_AGREEMENT = 'abaserviceagreement',
  ABA_TREATMENT_CONSENT = 'abatreatmentconsent',
}

type PolicyType = 'PolicyA' | 'PolicyB'

export { type Document, DocumentType, type PolicyType }
