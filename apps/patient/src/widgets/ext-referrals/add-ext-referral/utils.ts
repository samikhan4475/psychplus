import { getLocalTimeZone } from '@internationalized/date'
import { AppointmentType } from '@psychplus-v2/constants'
import { mapToUTCString } from '@psychplus-v2/utils'
import type {
  Address,
  ContactDetails,
  PhoneNumber,
  SchemaType,
} from '../add-ext-referral/components/schema'
import { PhoneNumberType } from './types'

const isEmptyPhoneNumber = (phone: PhoneNumber): boolean =>
  Object.entries(phone).every(([key, value]) => key === 'type' || value === '')

const isEmptyAddress = (address: Address): boolean =>
  Object.entries(address).every(
    ([key, value]) => key === 'type' || value === '',
  )

function cleanContactDetails(contactDetails: ContactDetails): ContactDetails {
  const { phoneNumbers, addresses, email } = contactDetails

  const cleaned: ContactDetails = {
    email,
    phoneNumbers:
      phoneNumbers?.length === 1 && isEmptyPhoneNumber(phoneNumbers[0])
        ? []
        : phoneNumbers,
    addresses:
      addresses?.length === 1 && isEmptyAddress(addresses[0]) ? [] : addresses,
  }

  if (cleaned.addresses && cleaned.addresses.length > 0) {
    cleaned.isMailingAddressSameAsPrimary = true
  }

  return cleaned
}

const addExtReferralInitialValues = (shortName?: string) => ({
  patientName: {
    firstName: '',
    lastName: '',
  },
  patientDateOfBirth: '',
  patientContactDetails: {
    phoneNumbers: [
      {
        type: 'Home' as PhoneNumberType,
        number: '',
      },
    ],
    addresses: [
      {
        type: 'Home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
    ],
    isMailingAddressSameAsPrimary: false,
    email: '',
  },
  requestedService: '',
  requestedMedium: '',
  requestedStateCode: '',
  requestedPostalCode: '',
  requestedTime: '',
  startDate: '',
  dischargeTime: '',
  referrerName: '',
  referrerShortName: shortName ?? 'anonymous',
  referrerContactDetails: {
    phoneNumbers: [
      {
        type: 'Home' as PhoneNumberType,
        number: '',
      },
    ],
    addresses: [
      {
        type: 'Home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
    ],
    isMailingAddressSameAsPrimary: false,
    email: '',
  },
  requestedProviderStaffId: undefined,
  source: '',
  additionalComments: '',
  payerName: '',
})

function transformOut(data: SchemaType): SchemaType {
  const isTeleVisit =
    data.requestedMedium && data.requestedMedium === AppointmentType.Virtual

  const patientAddress = data?.patientContactDetails?.addresses?.[0]

  const cleanedData: SchemaType = {
    ...data,
    patientContactDetails: cleanContactDetails(data.patientContactDetails),
    referrerContactDetails: cleanContactDetails(data.referrerContactDetails),
  }

  if (
    patientAddress &&
    !isEmptyAddress(patientAddress) &&
    patientAddress.postalCode
  ) {
    cleanedData.requestedPostalCode = patientAddress.postalCode
  }
  const timeZone = getLocalTimeZone()
  if (data.requestedTime) {
    const zonedString = data.time
      ? `${data.requestedTime}T${data.time}:00[${timeZone}]`
      : `${data.requestedTime}T00:00:00[${timeZone}]`

    cleanedData.requestedTime = mapToUTCString(zonedString)
  }
  if (data.dischargeTime) {
    cleanedData.dischargeTime = mapToUTCString(
      `${data.requestedTime}T00:00:00[${timeZone}]`,
    )
  }

  if (isTeleVisit) {
    delete cleanedData.patientContactDetails?.addresses
  }

  return cleanedData
}

export { addExtReferralInitialValues, transformOut }
