import { getLocalTimeZone } from '@internationalized/date'
import { ActionResult } from '@psychplus-v2/api'
import { AppointmentType } from '@psychplus-v2/constants'
import { mapToUTCString } from '@psychplus-v2/utils'
import { getDateString } from '@/utils'
import type {
  Address,
  ContactDetails,
  PhoneNumber,
  SchemaType,
} from '../add-ext-referral/components/schema'
import {
  PatientExtReferralParams,
  PhoneNumberType,
  ReferralType,
} from './types'

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

const addExtReferralInitialValues = (
  shortName?: string,
  stateCode?: string,
) => ({
  patientName: {
    firstName: '',
    lastName: '',
  },
  patientDateOfBirth: undefined,
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
        state: stateCode ?? '',
        country: '',
        postalCode: '',
      },
    ],
    isMailingAddressSameAsPrimary: false,
    email: '',
  },
  requestedService: '',
  requestedMedium: AppointmentType.Virtual,
  requestedStateCode: '',
  requestedPostalCode: '',
  requestedTime: undefined,
  startDate: '',
  dischargeTime: undefined,
  referrerFacility: '',
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
  time: '',
})

function transformOut(data: SchemaType): PatientExtReferralParams {
  const isTeleVisit =
    data.requestedMedium && data.requestedMedium === AppointmentType.Virtual

  const patientAddress = data?.patientContactDetails?.addresses?.[0]
  const { requestedTime, dischargeTime, patientDateOfBirth, ...rest } = data
  const cleanedData: PatientExtReferralParams = {
    ...rest,
    patientContactDetails: cleanContactDetails(data.patientContactDetails),
    referrerContactDetails: cleanContactDetails(data.referrerContactDetails),
  }

  if (patientAddress && !isEmptyAddress(patientAddress)) {
    const { postalCode, state } = patientAddress

    if (postalCode && !isTeleVisit) {
      cleanedData.requestedPostalCode = postalCode
    }
    if (state) {
      cleanedData.requestedStateCode = state
    }
  }
  const timeZone = getLocalTimeZone()
  if (requestedTime) {
    const zonedString = data.time
      ? `${data.requestedTime}T${data.time}:00[${timeZone}]`
      : `${data.requestedTime}T00:00:00[${timeZone}]`

    cleanedData.requestedTime = mapToUTCString(zonedString)
  }
  if (dischargeTime) {
    cleanedData.dischargeTime = mapToUTCString(
      `${data.dischargeTime}T00:00:00[${timeZone}]`,
    )
  }

  if (patientDateOfBirth) {
    cleanedData.patientDateOfBirth = getDateString(patientDateOfBirth)
  }

  if (isTeleVisit) {
    delete cleanedData.patientContactDetails?.addresses
  }

  return cleanedData
}

function withRetry<T>(
  fn: () => Promise<ActionResult<T>>,
  retries = 3,
  delayMs = 500,
): Promise<ActionResult<T>> {
  const attempt = (remaining: number): Promise<ActionResult<T>> => {
    return fn().then((result) => {
      if (result.state === 'success' || remaining === 1) {
        return result
      }
      return new Promise<ActionResult<T>>((res) =>
        setTimeout(() => attempt(remaining - 1).then(res), delayMs),
      )
    })
  }

  return attempt(retries)
}
function shouldShowFacilitySelect(
  formType: ReferralType,
  referrerShortName?: string,
): boolean {
  return formType === ReferralType.Facility && Boolean(referrerShortName)
}
export {
  addExtReferralInitialValues,
  transformOut,
  withRetry,
  shouldShowFacilitySelect,
}
