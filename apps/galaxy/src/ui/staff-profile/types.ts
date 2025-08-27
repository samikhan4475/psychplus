import { DateValue } from 'react-aria-components'
import { Staff } from '../staff-management/types'

interface StaffUpdatePayload extends Partial<Staff> {
  staffId: string
  staffUserRoleIds: string[]
  dob?: DateValue | string | null
  isVirtualRoomLink?: boolean
  biography?: string
  npi: string
  supervisorStaffId: string
  specialists: string[]
  providerAttributions?: string[]
  organizationIds: string[]
  timeZonePreference: string
  hasBioVideo?: boolean
  staffTypeIds?: string[]
  specialtyCodes: string
  userActorCategory: string
  hasPhoto?: boolean
  staffScope: string
}

export enum Credentials {
  LCSW_A = 'LCSW-A',
  LMFT_A = 'LMFT-A',
  LPC_A = 'LPC-A',
}

export { type StaffUpdatePayload }
