const STATIC_ROUNDING_FILTERS = [
  'startDate',
  'endDate',
  'name',
  'age',
  'gender',
  'dob',
  'patientStatus',
  'clinicLocation',
  'service',
]

const OTHER_ROUNDING_FILTERS = [
  'Provider Type',
  'Unit',
  'Room',
  'Group',
  'Primary Insurance',
  'Secondary Insurance',
  'Visit Type',
  'Visit Sequence',
  'Visit Medium',
  'Visit Status',
  'Ins Verification',
  'Diagnosis',
  'CPT Code',
  'DOA',
  'LOS',
  'LCD',
  'Legal',
  'Co-Pay',
  'Co-Ins',
  'Balance',
  'Note Signed',
]

const ROUNDING_FILTERS_KEY = 'rounding-filters'

export { STATIC_ROUNDING_FILTERS, OTHER_ROUNDING_FILTERS, ROUNDING_FILTERS_KEY }
