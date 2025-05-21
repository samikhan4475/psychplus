import { DateValue } from 'react-aria-components'
import { SelectOptionType, SharedCode } from '@/types'
import { FEATURE_TYPES } from './constants'
import { SchemaType } from './dialogs'
import { Address } from './types'

const getInitialValues = (id?: string, type?: string): SchemaType => ({
  bioVideo: null,
  dateOfBirth: null as unknown as DateValue,
  biography: '',
  isVirtualRoomLink: true,
  hasBioVideo: false,
  gender: '',
  language: [],
  preferredLanguage: '',
  password: '',
  passwordConfirm: '',
  staffRoleId: '1',
  supervisedBy: '',
  supervisorStaffId: '',
  npi: '',
  status: 'Active',
  virtualRoomLink: '',
  providerAttributions: [],
  staffUserRoleIds: [''],
  organizationIds: type === FEATURE_TYPES.ORGANIZATION ? [id ?? ''] : [''],
  practiceIds: [''],
  isTest: false,
  staffType: '',
  userRoleId: '',
  otpCode: '',
  staffId: '',
  timeZonePreference: '',
  legalName: {
    firstName: '',
    honors: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    suffix: '',
    title: '',
  },
  contactInfo: {
    email: '',
    emailVerificationStatus: '',
    isMailingAddressSameAsPrimary: false,
    phoneNumbers: [],
  },
  socialSecurityNumber: '',
  homeAddress: {
    city: '',
    country: '',
    postalCode: '',
    type: '',
    state: '',
    street1: '',
    street2: '',
    timeZoneId: '',
  },
  mailingAddress: {
    city: '',
    country: '',
    postalCode: '',
    type: '',
    state: '',
    street1: '',
    street2: '',
    timeZoneId: '',
  },
  hipaaConsentOn: '',
  referralName: '',
  relationship: '',
  referralSource: '',
  termsOfServiceConsentOn: '',
  privacyPolicyConsentOn: '',
})

const createOptionsLookup = (options: SelectOptionType[]) =>
  options.reduce(
    (acc, { label, value }) => ({ ...acc, [value]: { label, value } }),
    {} as Record<string, SelectOptionType>,
  )

const isValidVideoSize = (file: File | undefined, maxSize: number): boolean => {
  if (!file || !maxSize) return false
  const fileSizeInMB = file.size / (1024 * 1024)
  if (fileSizeInMB > maxSize) {
    return false
  }
  return true
}

const getCredentialsOptions = (codes: SharedCode[], role = '') => {
  return codes.reduce((acc: SelectOptionType[], item) => {
    const { display, value, attributes = [] } = item
    const roles =
      attributes
        ?.find((attr) => attr?.name === 'DisplayRoles')
        ?.value?.split('|') ?? []
    if (roles?.some((item) => item?.includes(role?.replace(' ', '')))) {
      return [...acc, { label: display, value }]
    }
    return acc
  }, [])
}

const getAddressData = (addresses: Address[], type: string) => {
  return addresses.find((address) => address.type === type)
}

export {
  getInitialValues,
  createOptionsLookup,
  isValidVideoSize,
  getCredentialsOptions,
  getAddressData,
}
