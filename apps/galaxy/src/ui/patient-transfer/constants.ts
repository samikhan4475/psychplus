const PATIENT_TRANSFER_TABLE_PAGE_SIZE = 20
export { PATIENT_TRANSFER_TABLE_PAGE_SIZE }

export const SERVICE_STATUS_CODESET = [
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Pending',
    value: 'pending',
  },

  {
    label: 'Cancelled',
    value: 'cancelled',
  },
]
export const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export const BOOLEAN_OPTIONS = [
  { label: 'Yes', value: 'yes' },

  { label: 'No', value: 'no' },
]

export const SERVICE_STATUS_OPTIONS = [
  { value: 'Approved', label: 'Approved' },
  { value: 'Cancel', label: 'Cancel' },
  { value: 'Postponed', label: 'Postponed' },
  { value: 'All', label: 'All' },
]
