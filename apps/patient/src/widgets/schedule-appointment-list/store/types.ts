import {
  AppointmentsCacheMap,
  LocationProvidersFilterState,
} from '@psychplus-v2/types'
import { StaffAppointmentAvailabilities } from '@psychplus/appointments'
import { Clinic } from '@psychplus/clinics'
import { CodeSetState } from '@psychplus/codeset'
import { type Staff } from '@psychplus/staff'
import { User } from '@psychplus/user'
import { ToastData } from '@/providers'
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
  state: string
  locationId?: string
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
  cache: AppointmentsCacheMap<StaffWithClinicsAndSlots[]>
  data?: StaffWithClinicsAndSlots[]
  searchLocationsProviders: (
    filters: LocationProvidersFilterState,
    toast?: (data: ToastData) => void,
  ) => void
  loading?: boolean
}

interface PatientState {
  patient: User | undefined
  setPatient: (patient: User) => void
  gMapKey: string
  setGMapKey: (gMapKey: string) => void
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
