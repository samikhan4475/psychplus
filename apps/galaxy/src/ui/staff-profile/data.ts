import { SelectOptionType } from '@/types'
import {
  deepSanitizeFormData,
  getPaddedDateString,
  sanitizeFormData,
} from '@/utils'
import { Staff } from '../staff-management/types'
import { SchemaType } from './schema'
import { StaffUpdatePayload } from './types'

const transformOut = ({
  mailingAddress,
  homeAddress,
  phoneContact,
  contactInfo: {
    isMailingAddressSameAsPrimary,
    emailVerificationStatus,
    email,
  },

  ...data
}: SchemaType): Partial<Staff> => {
  const addresses = [
    deepSanitizeFormData({ ...homeAddress, type: 'Business' }),
    deepSanitizeFormData({
      ...(isMailingAddressSameAsPrimary ? homeAddress : mailingAddress),
      type: 'Mailing',
    }),
  ]

  return deepSanitizeFormData({
    ...data,
    contactInfo: deepSanitizeFormData({
      isMailingAddressSameAsPrimary,
      addresses,
      emailVerificationStatus: emailVerificationStatus ?? '',
      phoneNumbers: [{ number: phoneContact }],
      email,
    }),
    dob: data.dob ? getPaddedDateString(data.dob) : null,
  })
}

const transformInLanguages = (
  languages: string[],
  options: SelectOptionType[],
): string[] => {
  const optionsLookup = options.reduce((acc, { label, value }) => {
    acc[label] = value
    return acc
  }, {} as Record<string, string>)

  return languages.map((lang) => optionsLookup[lang] ?? lang)
}

const transformIn = (
  {
    id: staffId = '',
    legalName,
    dateOfBirth: dob = '',
    gender,
    contactInfo,
    spokenLanguages = [],
    virtualRoomLink = '',
    status = '',
    npi = '',
    staffUserRoleIds = [],
    supervisorStaffId = '',
    organizationIds = [],
    practiceIds = [],
    bio: biography = '',
    userId = '',
    hasBioVideo = false,
    timeZonePreference = '',
    providerAttributions = [],
    staffTypes: staffTypeIds = [],
    isMailingAddressSameAsPrimary,
    specialtyCodes = '',
    userActorCategory = '',
    staffScope = '',
    ...rest
  }: Partial<Staff>,
  languageOptions: SelectOptionType[],
): StaffUpdatePayload => ({
  staffId,
  userId,
  staffRoleId: '1',
  status,
  staffUserRoleIds,
  staffTypeIds,
  legalName: {
    ...legalName,
    firstName: legalName?.firstName ?? '',
    lastName: legalName?.lastName ?? '',
    title: legalName?.title ?? legalName?.honors ?? '',
  },
  dob,
  spokenLanguages: transformInLanguages(spokenLanguages, languageOptions),
  virtualRoomLink,
  biography,
  npi,
  gender: String(gender),
  supervisedBy: rest?.supervisedBy ?? '',
  supervisorStaffId,
  specialists: [],
  providerAttributions,
  organizationIds,
  practiceIds,
  timeZonePreference,
  hasBioVideo,
  contactInfo: {
    email: contactInfo?.email ?? '',
    addresses: contactInfo?.addresses ?? [],
    emailVerificationStatus: contactInfo?.emailVerificationStatus ?? '',
    phoneNumbers: contactInfo?.phoneNumbers ?? [],
    isMailingAddressSameAsPrimary: Boolean(
      contactInfo?.isMailingAddressSameAsPrimary ??
        isMailingAddressSameAsPrimary,
    ),
  },
  userActorCategory,
  specialtyCodes,
  staffScope,
  ...rest,
})

export { transformOut, transformIn, transformInLanguages }
