import { StaffAppointmentAvailabilities } from '@psychplus/appointments'
import { Clinic } from '@psychplus/clinics'
import { CodeSetState } from '@psychplus/codeset'
import { type Staff } from '@psychplus/staff'
import { User } from '@psychplus/user'
import {
  type Filters,
  type StaffWithClinicsAndSlots,
} from '@/widgets/schedule-appointment-list/types'

interface BookedSlot {
  clinic: Clinic | undefined
  specialist: Staff
  specialistTypeCode: number
  type: string
  startDate: string
  duration: number
  servicesOffered: string[]
}

interface AppointmentState {
  bookedSlot: BookedSlot | undefined
  filteredStaffAppointmentAvailabilities: StaffAppointmentAvailabilities | []
  staffWithClinicsAndSlots: StaffWithClinicsAndSlots[] | []
  currentWeekReel: number

  setBookedSlot: (staff?: BookedSlot) => void
  setCurrentWeekReel: (currentWeekReel: number) => void
  setFilteredStaffAppointmentAvailabilities: (
    filteredStaffAppointmentAvailabilities: StaffAppointmentAvailabilities | [],
  ) => void
  setStaffWithAvailableSlots: (
    staffWithClinicsAndSlots: StaffWithClinicsAndSlots[] | [],
  ) => void
}

interface AppointmentFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface PatientState {
  patient: User | undefined
  setPatient: (patient: User) => void
}

type StoreType = AppointmentState &
  AppointmentFiltersState &
  CodeSetState &
  PatientState

export type {
  AppointmentState,
  AppointmentFiltersState,
  StoreType,
  BookedSlot,
  PatientState,
}
