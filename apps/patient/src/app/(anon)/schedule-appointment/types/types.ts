import { CodeSet } from '@psychplus/codeset'
import { Staff } from '@psychplus/staff'

export type Filters = {
  appointmentType: string
  providerType: string
  zipCode: string
  sortBy: string
  language: string
}

export type FilterProps = {
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string) => void
}

export type FilterButtonProps = {
  filterType: keyof Filters
  filterValue: string
  filterSelectedValue: string
  onFilterChange: (key: keyof Filters, value: string) => void
}

export type DropdownMenuComponentProps = {
  title: string
  filterType: keyof Filters
  items: string[] | undefined
  onFilterChange: (key: keyof Filters, value: string) => void
}

export type Location = {
  name: string
  geoCoordinates: {
    latitude: number
    longitude: number
  }
}

export type MapboxComponentProps = {
  width: number
  height: number
  zoom: number
  locations: Location[]
}

export interface CodeSetStoreState {
  languageCodeSet?: CodeSet
  specialistTypeCodeSet?: CodeSet
  staff?: Staff[]

  setCodeSets: (
    languageCodeSet?: CodeSet,
    specialistTypeCodeSet?: CodeSet,
  ) => void

  setStaff: (staff?: Staff[]) => void
}

export type StoreType = CodeSetStoreState
