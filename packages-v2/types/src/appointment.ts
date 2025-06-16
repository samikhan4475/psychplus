import {
  AppointmentType,
  NewProviderType,
  ProviderType,
} from '@psychplus-v2/constants'
import { Address } from './address'
import type { Clinic } from './clinic'
import { LegalName } from './name'
import type { Specialist } from './provider'

interface Appointment {
  id: number
  status: string
  type: AppointmentType
  encounterNumber: string
  encounterTypeCode: number
  clinic: Clinic
  specialist: Specialist
  specialistTypeCode: ProviderType
  providerType: NewProviderType
  visitType?: string
  startDate: string
  endDate: string
  duration: number
  coPay: number
  coPayDue?: number
  coPayPaid?: number
  virtualRoomLink: string
  isCopayPaid: boolean
  isSelfPay: boolean
  serviceId: string
  isQuickNoteSigned: boolean
  cptAddonCodes: CptCode[]
}

interface CptCode {
  code: string
  display?: string
  isDefault?: boolean
  isDisabled?: boolean
}

interface AppointmentMinimalDetails {
  status: string
  type: AppointmentType
  specialistTypeCode: ProviderType
  locationId: string
  locationName: string
  locationAddress: Address
  physicianName: LegalName
  startDate: string
  endDate: string
  duration: number
  isCopayPaid: boolean
  isPatientHadAnyCheckedOutVisit: boolean
  isNoteSignedByProviderInLastYear: boolean
  isPatientNeedsToAddCreditCard: boolean
  isPatientNeedsToAcceptPolicies: boolean
}

export type { Appointment, CptCode, AppointmentMinimalDetails }
