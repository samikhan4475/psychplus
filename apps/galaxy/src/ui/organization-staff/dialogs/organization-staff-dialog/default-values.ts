import { getLocalCalendarDate } from '@/utils'
import { Staff } from '../../types'

const defaultValues = (data?: Staff, organizationId?: string) => {
  return {
    id: data?.id ?? '',
    firstName: data?.legalName.firstName ?? '',
    lastName: data?.legalName.lastName ?? '',
    middleName: data?.legalName.middleName ?? '',
    address1: data?.contactInfo.addresses[0].street1 ?? '',
    address2: data?.contactInfo.addresses[0].street2 ?? '',
    city: data?.contactInfo.addresses[0].city ?? '',
    state: data?.contactInfo.addresses[0].state ?? '',
    zip: data?.contactInfo.addresses[0].postalCode ?? '',
    status: data?.status ?? '',
    isMailingAddressSameAsHome: data?.isMailingAddressSameAsPrimary
      ? 'yes'
      : 'no',
    organizationIds: [organizationId],
    email: data?.contactInfo.email ?? '',
    phone: data?.phoneContact ?? '',
    dateOfBirth: data?.dateOfBirth && getLocalCalendarDate(data?.dateOfBirth),
    gender: data?.gender ?? '',
    practiceIds: data?.practiceIds ?? [],
    virtualRoomLink: data?.virtualRoomLink ?? '',
    password: data?.id ? '__password__' : '', // to hide the password we are showing this string in case of edit.
    language: data?.spokenLanguages ?? [],
    staffType: data?.staffTypes ? data?.staffUserRoleIds[0] : '',
    staffUserRoleIds: data?.staffUserRoleIds ? data?.staffUserRoleIds[0] : '',
    providerAttributions: data?.providerAttributions ?? [],
    npi: data?.npi ?? '',
    credentials: data?.legalName.honors ?? '',
    mailing: {
      street1:
        data && data?.contactInfo?.addresses?.length > 0
          ? data?.contactInfo.addresses[1].street1
          : '',
      street2:
        data && data?.contactInfo?.addresses?.length > 0
          ? data?.contactInfo.addresses[1].street2
          : '',
      city:
        data && data?.contactInfo?.addresses?.length > 0
          ? data?.contactInfo.addresses[1].city
          : '',
      state:
        data && data?.contactInfo?.addresses?.length > 0
          ? data?.contactInfo.addresses[1].state
          : '',
      postalCode:
        data && data?.contactInfo?.addresses?.length > 0
          ? data?.contactInfo.addresses[1].postalCode
          : '',
    },
    staffRoleId: data?.staffRoleId ?? '1',
  }
}

export { defaultValues }
