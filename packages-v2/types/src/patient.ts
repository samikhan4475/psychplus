import {
  AlternateOrPreviousContactDetails,
  AlternateOrPreviousName,
} from './alternative-or-previous'
import type { ContactDetails } from './contact'
import { DriversLicense } from './drivers-lisence'
import type { EmergencyContact, PatientGuardian } from './guardian'
import type { Metadata } from './metadata'
import type { LegalName } from './name'
import { PhoneNumber } from './phone'

interface PreferredPartnerUserWorklist {
  id: string
  addDate: string
  contactDetails: ContactDetails
  dob: string
  familyUserNumber: string
  gender: string
  isPrimaryPartner: boolean
  matchStatus: string
  userType: string
  userStatus: string
  dateTerm: string
  recordActive: string
  patientId: number
  partnerId: number
  metadata: Metadata
  name: LegalName
}

interface PatientProfile {
  id: number
  userId: number
  metadata: Metadata
  legalName: LegalName
  birthdate: string
  preferredLanguage?: string
  contactDetails: ContactDetails
  gender?: string
  genderExpression?: string
  genderOrientation?: string
  genderPronoun?: string
  guardian?: PatientGuardian
  emergencyContact?: EmergencyContact
  socialSecurityNumber?: string
  hasPhoto?: boolean
  chargeKey?: string
  medicalRecordNumber?: string
  cmdId?: string
  status?: string
  driversLicense?: DriversLicense
  hasGuardian?: boolean
  alternateOrPreviousName?: AlternateOrPreviousName
  alternateOrPreviousContactDetails?: AlternateOrPreviousContactDetails
  races?: string[]
  ethnicities?: string[]
  religion?: string
  motherMaidenName?: string
  language?: string
  languageAbility?: string
  languageProficiency?: string
  preferredPartnerUserWorklist?: PreferredPartnerUserWorklist[]
}
interface Address {
  type: 'Home' | 'Work';
  street1: string;
  postalCode: string;
}

interface RelationshipContactDetails {
  email: string;
  phoneNumbers: PhoneNumber[];
  addresses: Address[];
}

interface RelationshipData {
  id?: string;
  patientId: number;
  name: LegalName;
  isEmergencyContact: boolean;
  isGuardian: boolean;
  guardianRelationshipCode: string;
  contactDetails: RelationshipContactDetails;
  isAllowedToReleaseInformation: boolean
}

interface RelationshipDefaultValuesProps {
  id: string | undefined;
  patientId?: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  relationship: string;
  address: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  homePhone?: string;
  isEmergencyContact: boolean;
  isAllowedToReleaseInformation: boolean;
  isGuardian: boolean;
}

type RelationshipTableHeader =
  | 'First Name'
  | 'Middle Name'
  | 'Last Name'
  | 'Relationship'
  | 'Address'
  | 'Postal Code'
  | 'Email'
  | 'Home Phone'
  | 'Cell Phone'
  | 'Emergency Phone'
  | 'RRI'
  | 'Guardian'
  | 'Action';

export type { PatientProfile, RelationshipData, RelationshipDefaultValuesProps, RelationshipTableHeader }

