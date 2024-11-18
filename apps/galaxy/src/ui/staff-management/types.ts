interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates: GeoCoordinates
  timeZoneId: string
}

interface PhoneNumber {
  type: string
  number: string
  extension: string
  comment: string
}

interface ContactInfo {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
  isMailingAddressSameAsPrimary: boolean
}
interface EmergencyContact {
  name: LegalName
  relationship: string
  contact: ContactInfo
}
interface Guardian {
  name: LegalName
  isEmergencyContact: boolean
  relationship: string
  contact: ContactInfo
}

interface LegalName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface Staff {
  otpCode: string
  legalName: LegalName
  dateOfBirth: string
  gender: string
  socialSecurityNumber: string
  userRoleId: number
  isTest: boolean
  contactInfo: ContactInfo
  language: string[]
  preferredLanguage: string
  emergencyContact?: EmergencyContact
  guardian?: Guardian
  password: string
  passwordConfirm: string
  referralSource: string
  referralName: string
  hipaaConsentOn: string
  termsOfServiceConsentOn: string
  privacyPolicyConsentOn: string
  staffRoleId: number
  supervisedBy: string
  supervisorStaffId: number
  npi: string
  status: string
  virtualRoomLink: string
  organizationIds: string[]
  practiceIds: string[]
  providerAttributions: string[]
  staffUserRoleIds: string[]
}
interface GetStaffListResponse {
  staff: Staff[]
  total: number
}

export { type Staff, type GetStaffListResponse }
