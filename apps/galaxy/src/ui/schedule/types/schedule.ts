import { Metadata } from '@/types'
import { CalendarDate, Time } from '@internationalized/date'

interface BookedAppointment {
  appointmentType?: string
  appointmentId: number
  metadata: Metadata
  appointmentDate: string
  name: string
  age: number
  state: string
  gender: string
  dob: string
  patientStatus: string
  service: string
  patientInfoVerificationStatus: string
  patientInsuranceVerificationStatus: string
  patientConsentStatus: string
  patientCardVerificationStatus: boolean
  providerId: number
  providerName: string
  providerType: string
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
  insuranceVerification: string
  primaryInsuranceName: string
  secondaryInsuranceName: string
  copayDue: number
  copayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  isNoteSigned: boolean
  locationName: string
  duration: string
  unitResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    unit: string
    coSignerId: number
  }
  groupResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    group: string
    coSignerId: number
  }
  room: string
  diagnosis: string
  cptCodes: string[]
  legalStatus: string
  authorizationNumber: string
  dateOfAddmission: string
  lengthOfStay: number
}

enum VisitStatusCodes {
  SeenDcByPrimary = 'SeenDischargeByPrimary',
  UnseenDcByPrimary = 'UnseenDischargeByPrimary',
  Seen = 'Seen',
  SeenByOther = 'SeenByOther',
  Unseen = 'Unseen',
  Absent = 'Absent',
  Error = 'Error',
  TransferToOther = 'TransferToOther',
}

type FilterValue = string | number | CalendarDate | string[] | Time

interface UserSetting {
  id?: string
  settingStatusCode?:string
  levelCode?:string
  categoryCode?:string
  categoryValue?:string
  name:string
  content:string
}

export type { BookedAppointment, FilterValue, UserSetting }

export { VisitStatusCodes }