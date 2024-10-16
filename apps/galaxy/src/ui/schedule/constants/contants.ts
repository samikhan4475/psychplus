const ROUNDING_FILTERS = [
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

const LIST_VIEW_FILTERS = [
  'Location',
  'Service',
  'Unit',
  'Room',
  'Group',
  'Provider Type',
  'Provider',
  'Visit Type',
  'Visit Sequence',
  'Visit Medium',
  'Visit Status',
  'Ins Verification',
  'Primary Insurance',
  'Secondary Insurance',
  'Co-Pay',
  'Co-Ins',
  'Balance',
  'DOA',
  'LOS',
  'LCD',
  'Authorization Number',
  'Legal',
  'Note Signed',
]

const ROUNDING_FILTERS_KEY = 'rounding-filters'

const NOTE_SIGNED: Record<string, boolean> = {
  'yes': true,
  'no': false,
}

const PROVIDER_CODING_FILTERS = [
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

// setting locale where start of the week is monday
const START_OF_WEEK_LOCALE = 'fr-FR'

export {
  ROUNDING_FILTERS,
  ROUNDING_FILTERS_KEY,
  PROVIDER_CODING_FILTERS,
  LIST_VIEW_FILTERS,
  NOTE_SIGNED,
  START_OF_WEEK_LOCALE,
}
