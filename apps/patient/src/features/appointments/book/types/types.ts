import {
  AppointmentType,
  PaymentType,
  ProviderType,
} from '@psychplus-v2/constants'
import { CareTeamMember, Clinic, Consent } from '@psychplus-v2/types'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance } from '@/features/billing/payments/types'
import { InsurancePayer } from '@/features/billing/payments/types/insurance'
import { NoteSectionItem } from '@/features/note/types'
import { AppointmentSlot, AppointmentSpecialist } from '../../search/types'

interface ConfirmationNote {
  appointmentType: string
  notes: string[]
}

interface BookAppointmentStore {
  appointmentType: AppointmentType
  providerType: ProviderType
  mapKey: string
  stripeApiKey: string
  creditCards: CreditCard[]
  userConsents: Consent[]
  careTeam: CareTeamMember[]
  setProviderType: (value: ProviderType) => void
  setAppointmentType: (value: AppointmentType) => void
  setCreditCards: (value: CreditCard[]) => void
  setUserConsents: (value: Consent[]) => void
  setCareTeam: (value: CareTeamMember[]) => void
  setStripeApiKey: (value: string) => void
  setMapKey: (value: string) => void
}

interface BookedSlot {
  slot: AppointmentSlot
  clinic: Clinic
  specialist: AppointmentSpecialist
  appointmentType: AppointmentType
  providerType: ProviderType
  newProviderType: string | null
}

interface BookSlotButtonProps {
  appointmentId?: string
  specialistId?: string
  bookedSlot: BookedSlot
  careTeam: CareTeamMember[]
  setBookingSuccessful: (value: boolean) => void
  paymentMethod: PaymentType
  creditCards: CreditCard[]
  patientInsurances?: Insurance
}

interface ConfirmedAppointmentProps {
  bookedSlot: BookedSlot
  mapKey: string
}

interface PaymentMethodProps {
  creditCards: CreditCard[]
  stripeApiKey: string
  paymentMethod: PaymentType
  setPaymentMethod: (value: PaymentType) => void
  patientInsurances: Insurance
  insurancePayers: InsurancePayer[]
  appointmentType?: AppointmentType
  diagnosisCodes: NoteSectionItem[]
}

interface BookedAppointmentProps {
  bookedSlot: BookedSlot
}

interface PrimaryProviderAppointedProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (open: boolean) => void
  newProviderType: string | null
}

interface NewProviderSelectedProps {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: (open: boolean) => void
  specialistStaffId: number
  newProviderType: string | null
}

export type {
  ConfirmationNote,
  BookedSlot,
  BookAppointmentStore,
  PaymentMethodProps,
  BookSlotButtonProps,
  BookedAppointmentProps,
  ConfirmedAppointmentProps,
  PrimaryProviderAppointedProps,
  NewProviderSelectedProps,
}
