import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { ContactMadeStatuses, ReferralStatuses, StaffResource } from '@/types'

const isPrescriber = (staff?: StaffResource) =>
  staff?.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

const isReferralDeleted = (resourceStatus = '') =>
  resourceStatus === ReferralStatuses.Deleted

const getDefaultContactMadeStatuses = () => [
  ContactMadeStatuses.NotSet,
  ContactMadeStatuses.Pending,
  ContactMadeStatuses.AuthInProcess,
  ContactMadeStatuses.AttemptedContact,
  ContactMadeStatuses.Refused,
  ContactMadeStatuses.Scheduled,
  ContactMadeStatuses.Cancelled,
  ContactMadeStatuses.Admitted,
  ContactMadeStatuses.SecondAttempt,
  ContactMadeStatuses.ThirdAttempt,
]
export { isPrescriber, isReferralDeleted, getDefaultContactMadeStatuses }
