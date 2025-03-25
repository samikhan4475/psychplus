import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { ContactMadeStatuses, ReferralStatuses, StaffResource } from '@/types'

const isPrescriber = (staff?: StaffResource) =>
  staff?.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

const isReferralDeleted = (resourceStatus = '') =>
  resourceStatus === ReferralStatuses.Deleted

const isReferralEditAble = (resourceStatus = '') =>
  resourceStatus !== ReferralStatuses.Pending &&
  resourceStatus !== ReferralStatuses.Incomplete

const isReferralSignAble = (resourceStatus = '') =>
  resourceStatus !== ReferralStatuses.Unsigned

const isContactMadeScheduledOrCancelled = (ContactMadeStatus = '') =>
  ContactMadeStatus === ContactMadeStatuses.Scheduled ||
  ContactMadeStatus === ContactMadeStatuses.Cancelled

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

const getDefaultReferralStatuses = () => [
  ReferralStatuses.Pending,
  ReferralStatuses.Incomplete,
  ReferralStatuses.Completed,
  ReferralStatuses.Unsigned,
]

const getDefaultActualNoteViewStatuses = () => [
  ReferralStatuses.Pending,
  ReferralStatuses.Incomplete,
  ReferralStatuses.Completed,
]
export {
  isPrescriber,
  isReferralDeleted,
  getDefaultContactMadeStatuses,
  isContactMadeScheduledOrCancelled,
  getDefaultReferralStatuses,
  isReferralEditAble,
  isReferralSignAble,
  getDefaultActualNoteViewStatuses,
}
