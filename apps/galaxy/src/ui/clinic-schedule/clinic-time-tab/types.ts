import { Cosigner, Location, Metadata, VisitType } from '@/types'
import { ClinicTimeFilterSchemaType } from './schema'

interface StateCosigner {
  telestate: string
  location: string
  cosigner: string
}
interface Service {
  serviceId: string
  serviceOffered: string
  maxBookingsPerSlot: number
  therapyTypeCode?: string
}

interface TeleState {
  stateId: string
  stateCode: string
  locationId: string
  cosignerStaffId?: number
  locationName?: string
  cosignerStaffName?: {
    firstName: string
    lastName: string
    preferredName: string
    title: string
    suffix: string
    honors: string
  }
}

type Visit = Partial<VisitType> & {
  serviceVisitTypeId: string
  visitTypeId?: string
}
interface ClinicSchedule {
  id: number
  metadata: Metadata
  status: string
  staffId: number
  stateCode: string
  locationId: string
  locationName: string
  dayOfSchedule: string
  weeklyRecurrence: string
  ageGroups: string[]
  isApproved: boolean
  startDate: string
  startTime: string
  visitMedium: string
  cosignerStaffId: number
  cosignerName: string
  isPublicViewable: boolean
  serviceId: string
  serviceOffered: string
  maxBookingsPerSlot: number
  teleStates: TeleState[]
  visitTypes: Visit[]
  endDate?: string
  endTime?: string
  therapyTypeCode?: string
  timezoneId?: string
}

type ClinicScheduleForm = Omit<ClinicSchedule, 'id' | 'metadata'>

interface GetClinicScheduleListResponse {
  clinicSchedules: ClinicSchedule[]
}

type PartialClinicTimeFilterSchema = Partial<ClinicTimeFilterSchemaType> & {
  staffId?: string
}
interface GetClinicVisitListParams {
  staffId: string
  page?: number
  formValues?: PartialClinicTimeFilterSchema
}

interface AddClinicScheduleResponse {
  staffId: string
  formValues: ClinicSchedule
}

interface PropsWithStaffId {
  staffId: string
}
interface LegalName {
  firstName: string
  middleName: string
  lastName: string
}
interface License {
  id: string
  stateId: string
  metadata: Metadata
  stateCode: string
  providerStaffId: number
  licenseNumber: string
  licenseType: string
  startDate: string
  endDate: string
  isAlertCheck: boolean
  status: string
  recordStatus: string
}

type State = Pick<License, 'stateId' | 'stateCode'>
interface StaffLicenseResponse {
  staffId: number
  userId: number
  legalName: LegalName
  licenses: License[]
}

interface LocationWithCosigner {
  location: Location
  cosigners?: Cosigner[]
}

interface StateWithLocationAndCosigners {
  stateCode: string
  locationsWithCosigners: LocationWithCosigner[]
}

export type {
  StateCosigner,
  ClinicSchedule,
  Service,
  TeleState,
  Visit,
  PartialClinicTimeFilterSchema,
  GetClinicVisitListParams,
  GetClinicScheduleListResponse,
  AddClinicScheduleResponse,
  PropsWithStaffId,
  ClinicScheduleForm,
  StaffLicenseResponse,
  State,
  LocationWithCosigner,
  StateWithLocationAndCosigners,
  License,
}
