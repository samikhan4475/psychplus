export const YesNoOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

export const GUARDIAN_SELECT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export const ORGANIZATION_TYPE_OPTIONS = [
  { value: 'clinic', label: 'Clinic' },
  { value: 'payer', label: 'Payer' },
  { value: 'hospital', label: 'Hospital' },
]

export const PRIOR_AUTH_STATUS_OPTIONS = [
  { value: 'NotNeeded', label: 'Not Needed' },
  { value: 'InfoNeeded', label: 'Info Needed' },
  { value: 'NotCovered', label: 'Not covered' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Denied', label: 'Denied' },
  { value: 'Resubmitted', label: 'Resubmitted' },
]

const EXTERNAL_REFERRAL_TABLE_PAGE_SIZE = 30
const INVALID_RANGE_ERROR = 'Invalid date range'

export { EXTERNAL_REFERRAL_TABLE_PAGE_SIZE, INVALID_RANGE_ERROR }
