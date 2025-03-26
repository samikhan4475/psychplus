import { SelectOptionType } from '@/types'
import { Address, Staff } from '../staff-management/types'
import { StaffUpdatePayload } from './types'

const defaultAddress = {
  type: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  timeZoneId: '',
}

function transformOut(data: StaffUpdatePayload): StaffUpdatePayload {
  const businessAddress =
    data.addresses?.find((addr: Address) => addr.type === 'Business') ||
    defaultAddress
  const mailingAddress =
    data.addresses?.find((addr: Address) => addr.type === 'Mailing') ||
    defaultAddress

  delete data['addresses']
  return {
    ...data,
    address: businessAddress.street1 || '',
    address2: businessAddress.street2 || '',
    country: businessAddress.country || '',
    stateCode: businessAddress.state || '',
    city: businessAddress.city || '',
    postalCode: businessAddress.postalCode || '',
    secondaryAddress: mailingAddress.street1 || businessAddress.street1 || '',
    secondaryAddress2: mailingAddress.street2 || businessAddress.street2 || '',
    secondaryCountry: mailingAddress.country || businessAddress.country || '',
    secondaryStateCode: mailingAddress.state || businessAddress.state || '',
    secondaryCity: mailingAddress.city || businessAddress.city || '',
    secondaryPostalCode:
      mailingAddress.postalCode || businessAddress.postalCode || '',
  }
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
  data: Partial<Staff>,
  languageOptions: SelectOptionType[],
): StaffUpdatePayload => {
  const {
    id,
    legalName,
    dateOfBirth,
    gender,
    contactInfo,
    spokenLanguages = [],
    virtualRoomLink = '',
    status,
    npi = '',
    staffUserRoleIds = [],
    supervisorStaffId = '',
    organizationIds = [],
    practiceIds = [],
    phoneContact,
    bio,
    userId,
    hasBioVideo,
    timeZonePreference,
    supervisedBy,
    providerAttributions,
  } = data
  const {
    firstName = '',
    middleName = '',
    lastName = '',
    honors = '',
  } = legalName || {}

  const {
    email = '',
    phoneNumbers = [],
    addresses,
    isMailingAddressSameAsPrimary = false,
  } = contactInfo || {}
  const getAddress = (type: string) => {
    const address = addresses?.find((address) => address.type === type)

    return {
      type,
      street1: address?.street1 ?? '',
      street2: address?.street2 ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      country: address?.country ?? '',
      postalCode: address?.postalCode ?? '',
      geoCoordinates: address?.geoCoordinates ?? {
        longitude: 0,
        latitude: 0,
        altitude: 0,
      },
      timeZoneId: address?.timeZoneId ?? '',
    }
  }
  const homeAddress = getAddress('Business')
  const mailingAddress = getAddress('Mailing')
  const phoneNumber = phoneNumbers?.[0]?.number ?? phoneContact
  return {
    addresses: [homeAddress, mailingAddress],
    staffId: id ?? '',
    userId: userId ?? '',
    staffRoleId: '1',
    status: status ?? '',
    staffUserRoleIds,
    staffTypeIds: staffUserRoleIds ?? [],
    firstName,
    lastName,
    dob: dateOfBirth ?? '',
    spokenLanguages: transformInLanguages(spokenLanguages, languageOptions),
    middleName,
    address: '',
    address2: '',
    country: '',
    stateCode: '',
    city: '',
    postalCode: '',
    secondaryAddress: '',
    secondaryAddress2: '',
    secondaryCountry: '',
    secondaryStateCode: '',
    secondaryCity: '',
    secondaryPostalCode: '',
    virtualRoomLink,
    biography: bio ?? '',
    title: honors,
    npi,
    gender,
    email,
    phoneContact: phoneNumber,
    supervisedBy: supervisedBy,
    supervisorStaffId,
    specialists: [],
    providerAttributions: providerAttributions || [],
    organizationIds,
    practiceIds,
    isMailingAddressSameAsPrimary,
    timeZonePreference: timeZonePreference || '',
    hasBioVideo: hasBioVideo,
  }
}

export { transformOut, transformIn, transformInLanguages }
