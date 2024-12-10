import { DateValue } from 'react-aria-components'
import { Address } from '../staff-management/types'

interface StaffUpdatePayload {
  staffId: string
  userId: string
  staffRoleId?: string
  status: string
  staffUserRoleIds: string[]
  firstName: string
  lastName: string
  dob?: DateValue | string | null
  middleName?: string
  address?: string
  address2?: string
  country?: string
  stateCode?: string
  city?: string
  postalCode?: string
  secondaryAddress?: string
  secondaryAddress2?: string
  secondaryCountry?: string
  secondaryStateCode?: string
  secondaryCity?: string
  secondaryPostalCode?: string
  spokenLanguages: string[]
  virtualRoomLink?: string
  biography?: string
  title?: string
  npi: string
  gender?: string
  email: string
  phoneContact: string
  supervisedBy?: string
  supervisorStaffId: string
  specialists: string[]
  providerAttributions: string[]
  addresses?: Address[]
  organizationIds: string[]
  practiceIds: string[]
  isMailingAddressSameAsPrimary: boolean
}

export { type StaffUpdatePayload }
