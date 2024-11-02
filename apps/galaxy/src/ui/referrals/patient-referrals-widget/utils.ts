import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'

const isPrescriber = (staff?: StaffResource) =>
  staff?.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

export { isPrescriber }
