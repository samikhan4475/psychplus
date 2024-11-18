import { Staff } from '../../types' // Assuming this is the type for staff

const getInitialValues = (staff?: Staff) => ({
  otpCode: staff?.otpCode ?? '',
  legalName: {
    firstName: staff?.legalName?.firstName ?? '',
    middleName: staff?.legalName?.middleName ?? '',
    lastName: staff?.legalName?.lastName ?? '',
    preferredName: staff?.legalName?.preferredName ?? '',
    title: staff?.legalName?.title ?? '',
    suffix: staff?.legalName?.suffix ?? '',
    honors: staff?.legalName?.honors ?? '',
  },

  dateOfBirth: staff?.dateOfBirth ?? undefined,
  gender: staff?.gender ?? '',
  socialSecurityNumber: staff?.socialSecurityNumber ?? '',
  userRoleId: staff?.userRoleId ?? undefined,

  contactInfo: {
    email: staff?.contactInfo?.email ?? '',
    emailVerificationStatus:
      staff?.contactInfo?.emailVerificationStatus ?? 'pending',
    phoneNumbers: staff?.contactInfo?.phoneNumbers?.length
      ? staff.contactInfo.phoneNumbers
      : [
          {
            type: '',
            number: '',
            extension: '',
            comment: '',
          },
        ],
    addresses: staff?.contactInfo?.addresses?.length
      ? staff.contactInfo.addresses
      : [
          {
            postalCode: '',
            type: 'Home',
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
          },
        ],
    isMailingAddressSameAsPrimary:
      staff?.contactInfo?.isMailingAddressSameAsPrimary ?? false,
  },

  language: staff?.language ?? [],
  preferredLanguage: staff?.preferredLanguage ?? '',

  guardian: staff?.guardian
    ? {
        name: {
          firstName: staff?.guardian?.name?.firstName ?? '',
          middleName: staff?.guardian?.name?.middleName ?? '',
          lastName: staff?.guardian?.name?.lastName ?? '',
          preferredName: staff?.guardian?.name?.preferredName ?? '',
          title: staff?.guardian?.name?.title ?? '',
          suffix: staff?.guardian?.name?.suffix ?? '',
          honors: staff?.guardian?.name?.honors ?? '',
        },
        isEmergencyContact: staff?.guardian?.isEmergencyContact ?? false,
        relationship: staff?.guardian?.relationship ?? '',
        contact: staff?.guardian?.contact
          ? {
              email: staff?.guardian?.contact?.email ?? '',
              emailVerificationStatus:
                staff?.guardian?.contact?.emailVerificationStatus ?? '',
              phoneNumbers: staff?.guardian?.contact?.phoneNumbers?.length
                ? staff?.guardian.contact.phoneNumbers
                : [
                    {
                      type: '',
                      number: '',
                      extension: '',
                      comment: '',
                    },
                  ],
              addresses: staff?.guardian?.contact?.addresses?.length
                ? staff?.guardian.contact.addresses
                : [
                    {
                      type: '',
                      street1: '',
                      street2: '',
                      city: '',
                      state: '',
                      country: '',
                      postalCode: '',
                      geoCoordinates: {
                        longitude: 0,
                        latitude: 0,
                        altitude: 0,
                      },
                      timeZoneId: '',
                    },
                  ],
              isMailingAddressSameAsPrimary:
                staff?.guardian?.contact?.isMailingAddressSameAsPrimary ??
                false,
            }
          : undefined,
      }
    : undefined,
  password: staff?.password ?? '',
  passwordConfirm: staff?.passwordConfirm ?? '',
  staffRoleId: staff?.staffRoleId ?? undefined,
  supervisedBy: staff?.supervisedBy ?? '',
  supervisorStaffId: staff?.supervisorStaffId ?? undefined,
  npi: staff?.npi ?? '',
  status: staff?.status ?? 'active',
  virtualRoomLink: staff?.virtualRoomLink ?? '',
})

export { getInitialValues }
