const LOCATION_LIST_TABLE_PAGE_SIZE = 20

enum LocationType {
  Clinic = 'Clinic',
  Facility = 'Facility',
}

const LocationTypeOptions = [
  { value: LocationType.Clinic, label: 'Clinic' },
  { value: LocationType.Facility, label: 'Facility' },
]

export { LOCATION_LIST_TABLE_PAGE_SIZE, LocationTypeOptions, LocationType }
