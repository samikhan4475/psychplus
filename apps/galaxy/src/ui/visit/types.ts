import { Gender, LegalName } from '@/types'

interface GeoCoordinates {
  longitude: number
  latitude: number
}

interface Address {
  type: string
  street1: string
  city: string
  state: string
  postalCode: string
  geoCoordinates: GeoCoordinates
}

interface Contact {
  addresses: Address[]
}

interface Metadata {
  createdOn: string
  createdBy?: number
  updatedOn?: string
}

interface Clinic {
  id: string
  metadata: Metadata
  isTest: boolean
  name: string
  group: string
  description: string
  contact: Contact
}

interface VisitTypesPayload {
  locationId: string
  serviceId: string
}

interface StateCodeSet {
  id: string
  stateName: string
  stateCode: string
  metadata: Metadata
}

interface StatesCodeSetState {
  states: StateCodeSet[]
  setStates: (states: StateCodeSet[]) => void
}

interface DropdownOptions {
  label: string
  value: string
}

interface Service {
  id: string
  serviceOffered: string
}

interface ServiceWithOptions extends DropdownOptions, Service {}

interface PatientRaw {
  id: number
  metadata: Metadata
  legalName: LegalName
  contactDetails: { addresses: Address[] }
  birthdate: string
  medicalRecordNumber: string
  status: string
  gender: Gender
}

interface Patient {
  id: number
  firstName: string
  middleName: string
  lastName: string
  birthdate: string
  gender: string
  medicalRecordNumber: string
  status: string
  contactDetails?: { addresses: Address[] }
}

interface Provider {
  id?: number
  avatar?: string
  firstName: string
  lastName: string
  honors?: string
}

enum TCMVisitTypes {
  T_EST_PT_TRANSITIONAL_CARE = 'T - Est Pt, Transitional Care Mngt',
  T_NEW_PT_TRANSITIONAL_CARE = 'T - New Pt, Transitional Care Mngt',
  EST_PT_TRANSITIONAL_CARE = 'Est Pt, Transitional Care Mngt',
  NEW_PT_TRANSITIONAL_CARE = 'New Pt, Transitional Care Mngt',
}

interface ServerSearchSelectID {
  id?: string | number
}

enum ServiceType {
  Aba = 'Aba',
  Therapy = 'Therapy',
  CouplesFamilyTherapy = 'CouplesFamilyTherapy',
  GroupType = 'GroupType',
}

enum SpecialistType {
  Psychiatrist = '1',
  Therapist = '2',
  Bcba = '3',
}

interface StaffCommentsTreatment {
  date: string
  time: string
  staff: string
  comments: string
}

interface StaffCommentsBilling {
  date: string
  time: string
  staff: string
  comments: string
}

enum ServicesOffered {
  EmergencyRoom = 'EmergencyRoom',
  InpatientPsych = 'InpatientPsych',
  PartialHospital = 'PartialHospital',
  InpatientBehaviorHealthResidential = 'InpatientBehaviorHealthResidential',
  InpatientMedical = 'InpatientMedical',
  InpatientRehab = 'InpatientRehab',
  InpatientSubstanceUseResidential = 'InpatientSubstanceUseResidential',
}

export {
  type Clinic,
  type DropdownOptions,
  type Patient,
  type PatientRaw,
  type Provider,
  type Service,
  type ServiceWithOptions,
  type StateCodeSet,
  type StatesCodeSetState,
  type VisitTypesPayload,
  type ServerSearchSelectID,
  type StaffCommentsTreatment,
  type StaffCommentsBilling,
  ServiceType,
  SpecialistType,
  TCMVisitTypes,
  ServicesOffered,
}
