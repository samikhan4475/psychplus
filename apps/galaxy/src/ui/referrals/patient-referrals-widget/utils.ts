import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { ContactMadeStatuses, StaffResource } from '@/types'

const isPrescriber = (staff?: StaffResource) =>
  staff?.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

const isContactStatusError = (status: string) =>
  status === ContactMadeStatuses.Error

export { isPrescriber, isContactStatusError }
