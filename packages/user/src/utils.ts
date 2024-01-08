import type { Staff } from './types'

const STAFF_ROLE_CODE_PRESCRIBER = '1'

const isPrescriber = (staff: Staff) =>
  staff.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

export { isPrescriber }
