import { AppointmentType, NewProviderType, ProviderType } from '@psychplus-v2/constants'
import type { Clinic } from './clinic'
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
  startDate: string
  endDate: string
  duration: number
  coPay: number
  virtualRoomLink: string
  isCopayPaid: boolean
  isSelfPay: boolean
  serviceId: string
  isQuickNoteSigned: boolean
}

export type { Appointment }
