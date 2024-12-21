const CLAIM_LIST_TABLE_PAGE_SIZE = 20
const SUBMISSION_LIST_TABLE_PAGE_SIZE = 20
const INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE = 20
const PATIENT_STATEMENTS_LIST_TABLE_PAGE_SIZE = 20
const PATIENT_STATEMENT_TABLE_PAGE_SIZE = 20
const RESPONSE_HISTORY_TABLE_PAGE_SIZE = 20
const PATIENT_LIST_OPTION_SIZE = 20
const INSURANCE_PAYER_LIST_OPTION_SIZE = 20
const ENABLE_FORM_STATUSES = ['NewCharge', 'Denied', 'Rejected', 'Resubmit']
const CLAIM_STATUSES = [
  'NewCharge',
  'Approved',
  'Submitted',
  'Resubmit',
  'ReadyForSubmissionPrimary',
  'ReadyForSubmissionSecondary',
  'ReadyForSubmissionTertiary',
  'BilledToPrimary',
  'BilledToSecondary',
  'BilledToTertiary',
  'CreditPrimary',
  'CreditSecondary',
  'CreditTertiary',
  'PatientResponsibility',
  'CreditPatient',
  'Denied',
  'DeniedPrimary',
  'DeniedSecondary',
  'DeniedTertiary',
  'Paid',
  'ReveralApplied',
  'Rejected',
  'RejectedPrimary',
  'RejectedSecondary',
  'RejectedTertiary',
]

export {
  CLAIM_LIST_TABLE_PAGE_SIZE,
  SUBMISSION_LIST_TABLE_PAGE_SIZE,
  INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE,
  PATIENT_STATEMENTS_LIST_TABLE_PAGE_SIZE,
  PATIENT_STATEMENT_TABLE_PAGE_SIZE,
  RESPONSE_HISTORY_TABLE_PAGE_SIZE,
  PATIENT_LIST_OPTION_SIZE,
  INSURANCE_PAYER_LIST_OPTION_SIZE,
  ENABLE_FORM_STATUSES,
  CLAIM_STATUSES,
}
