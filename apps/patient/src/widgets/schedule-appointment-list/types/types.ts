import { Slot } from '@psychplus/appointments'
import { Clinic } from '@psychplus/clinics'
import { Staff } from '@psychplus/staff'

interface Filters {
  appointmentType: string
  providerType: string
  zipCode: string
  state?: string
  sortBy: string
  language: string
  startingDate: string
}

interface FilterOptionButtonProps {
  filterType: keyof Filters
  filterOption: string
  filterSelectedOption: string | undefined
  onFilterChange: (newFilters: Partial<Filters>) => void
}

interface FilterOptionsDropDownProps {
  prefix?: string
  filterType: keyof Filters
  options: string[] | undefined
  onFilterChange: (newFilters: Partial<Filters>) => void
  placeholder: string
  selectedOption?: string
  disabled?: boolean
}

interface Location {
  name: string
  geoCoordinates: {
    latitude: number
    longitude: number
  }
}

interface LocationMapProps {
  width: number
  height: number
  zoom: number
  locations: Location[]
}

interface StaffWithClinicsAndSlots {
  staff: Staff
  staffTypeCode: number
  clinicWithSlots: ClinicWithSlots[]
}

interface ClinicWithSlots {
  clinic: Clinic
  availableSlots: Slot[]
}

type ConfirmationNote = {
  appointmentType: string
  notes: string[]
}

export type {
  Filters,
  FilterOptionButtonProps,
  FilterOptionsDropDownProps,
  Location,
  LocationMapProps,
  StaffWithClinicsAndSlots,
  ClinicWithSlots,
  ConfirmationNote,
}
