import { AppointmentSlot } from '@psychplus-v2/types'
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

interface FilterOption {
  label: string
  value: string
}

interface FilterOptionButtonProps {
  filterType: keyof Filters
  filterOption: string
  filterSelectedOption: string | undefined
  onFilterChange: (newFilters: Partial<Filters>) => void
}

interface FilterOptionsDropDownProps {
  prefix?: string
  filterType: string
  options: FilterOption[]
  onFilterChange: (filter: Record<string, string>) => void
  placeholder?: string
  selectedOption?: string
  disabled?: boolean
  defaultValue?: string
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
  providerType?: string
}

interface ClinicWithSlots {
  clinic: Clinic
  availableSlots: AppointmentSlot[]
}

type ConfirmationNote = {
  appointmentType: string
  notes: string[]
}

interface DifferentStateDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: (open: boolean) => void
  myState: string
  providerState: string
  onConfirm?: () => void
}

interface SortFilterOptions {
  sortBy?: string
  language?: string
  startingDate?: string
  providerIds?: number[]
}
export type {
  Filters,
  FilterOption,
  FilterOptionButtonProps,
  FilterOptionsDropDownProps,
  Location,
  LocationMapProps,
  StaffWithClinicsAndSlots,
  ClinicWithSlots,
  ConfirmationNote,
  DifferentStateDialogProps,
  SortFilterOptions,
}
