import { getLocalCalendarDate } from '@/utils'
import { StaffUpdatePayload } from './types'

const removeTypeAndCompare = (address1: object, address2: object) => {
  const filterOutType = (address: object) =>
    Object.fromEntries(
      Object.entries(address).filter(([key]) => key !== 'type'),
    )
  return (
    JSON.stringify(filterOutType(address1)) ===
    JSON.stringify(filterOutType(address2))
  )
}
const getInitialValues = (staff?: Partial<StaffUpdatePayload>) => ({
  addresses: staff?.addresses ?? [
    {
      postalCode: '',
      type: 'Business',
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
    },
  ],
  staffId: (staff?.staffId && String(staff?.staffId)) ?? '',
  userId: (staff?.userId && String(staff?.userId)) ?? '',
  staffRoleId: (staff?.staffRoleId && String(staff?.staffRoleId)) ?? '',
  status: staff?.status ?? '',
  staffUserRoleIds: staff?.staffUserRoleIds ?? [],
  firstName: staff?.firstName ?? '',
  lastName: staff?.lastName ?? '',
  dob: (staff?.dob && getLocalCalendarDate(staff?.dob as string)) ?? undefined,
  middleName: staff?.middleName ?? '',
  spokenLanguages: staff?.spokenLanguages ?? [''],
  virtualRoomLink: staff?.virtualRoomLink ?? '',
  biography: staff?.biography ?? '',
  title: staff?.title ?? '',
  npi: staff?.npi ?? '',
  gender: staff?.gender ?? '',
  email: staff?.email ?? '',
  phoneContact: staff?.phoneContact ?? '',
  supervisedBy: staff?.supervisedBy ?? '',
  supervisorStaffId: staff?.supervisorStaffId ?? '',
  specialists: staff?.specialists ?? [''],
  providerAttributions: staff?.providerAttributions ?? [''],
  organizationIds: staff?.organizationIds ?? [''],
  practiceIds: staff?.practiceIds ?? [''],
  isMailingAddressSameAsPrimary:
    staff?.addresses && staff.addresses.length > 1
      ? removeTypeAndCompare(staff.addresses[0], staff.addresses[1])
      : false,
})

export { getInitialValues }
