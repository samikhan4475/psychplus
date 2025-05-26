import {
  PatientAddressType,
  PatientProfile,
  PhoneNumber,
  PhoneNumberType,
} from '@/types'
import { sanitizePhoneNumber } from '@/utils'

function applyClientSideFilters<T>(
  data: T[],
  filters: Partial<{ [K in keyof T]: T[K] }>,
): T[] {
  return data.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key as keyof T]
      const itemValue = item[key as keyof T]
      if (!filterValue) continue
      if (itemValue !== filterValue) return false
    }

    return true
  })
}

const initialPhone = {
  type: 'Home',
  number: '',
  extention: '',
  comment: '',
}

const initialAddress = {
  type: 'Home',
  street1: '',
  street2: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  zipLast4: '',
}

const isEmptyDriverLicense = (driverObj: PatientProfile['driversLicense']) => {
  if (!driverObj || typeof driverObj !== 'object') return true

  const { type, ...rest } = driverObj

  return Object.values(rest).every((value) => !value)
}

const cleanPayload = (payload: PatientProfile) => {
  if (isEmptyDriverLicense(payload.driversLicense)) {
    delete payload.driversLicense
  }
  return payload
}

const getPhoneNumber = (
  phoneNumbers: PhoneNumber[] = [],
  type: PhoneNumberType,
) => {
  const phoneNumber = phoneNumbers?.find((number) => number.type === type)
  if (!phoneNumber) {
    return { ...initialPhone, type }
  }
  return {
    ...phoneNumber,
    number: sanitizePhoneNumber(phoneNumber?.number ?? ''),
  }
}

const getInitialValues = (patient: PatientProfile) => {
  return {
    id: patient?.id,
    legalName: {
      firstName: patient?.legalName?.firstName ?? '',
      lastName: patient?.legalName?.lastName ?? '',
      middleName: patient?.legalName?.middleName ?? '',
      preferredName: patient?.legalName?.preferredName ?? '',
      title: patient?.legalName?.title ?? '',
      suffix: patient?.legalName?.suffix ?? '',
      honors: patient?.legalName?.honors ?? '',
    },
    birthdate: patient?.birthdate ?? '',
    hasGuardian: patient?.hasGuardian ?? false, // Ensure default value is set
    isTest: patient?.isTest ?? false,
    gender: patient?.gender ?? '',
    genderOrientation: patient?.genderOrientation ?? '',
    genderExpression: patient?.genderExpression ?? '',
    genderPronoun: patient?.genderPronoun ?? '',
    driversLicense: {
      type: patient?.driversLicense?.type ?? 'DriversLicense', // Ensure this is a valid value
      number: patient?.driversLicense?.number ?? '',
      validIn: patient?.driversLicense?.validIn ?? '',
      hasFrontImage: patient?.driversLicense?.hasFrontImage ?? false,
      hasBackImage: patient?.driversLicense?.hasBackImage ?? false,
    },
    contactDetails: {
      email: patient?.contactDetails?.email ?? '', // Ensure default value is set
      homeNumber: getPhoneNumber(patient?.contactDetails?.phoneNumbers, 'Home'),
      workNumber: getPhoneNumber(
        patient?.contactDetails?.phoneNumbers,
        'Business',
      ),
      mobileNumber: getPhoneNumber(
        patient?.contactDetails?.phoneNumbers,
        'Contact',
      ),
      homeAddress: patient?.contactDetails?.addresses?.find(
        (address) => address.type === 'Home',
      ) ?? { ...initialAddress, type: 'Home' },
      mailingAddress: patient?.contactDetails?.isMailingAddressSameAsPrimary
        ? { ...initialAddress, type: 'Mailing' as PatientAddressType }
        : patient?.contactDetails?.addresses?.find(
            (address) => address.type === 'Mailing',
          ) ?? { ...initialAddress, type: 'Mailing' }, // Ensure mailingAddress has a fallback
      isMailingAddressSameAsPrimary:
        patient?.contactDetails?.isMailingAddressSameAsPrimary ?? true,
    },
    cmdId: patient?.cmdId ?? '',
    referralName: patient?.referralName ?? '',
    referralSource: patient?.referralSource ?? '',
    motherMaidenName: patient?.motherMaidenName ?? '',
    alternateOrPreviousName: {
      firstName: patient?.alternateOrPreviousName?.firstName ?? '',
      lastName: patient?.alternateOrPreviousName?.lastName ?? '',
      middleName: patient?.alternateOrPreviousName?.middleName ?? '',
      preferredName: patient?.alternateOrPreviousName?.preferredName ?? '',
      title: patient?.alternateOrPreviousName?.title ?? '',
      suffix: patient?.alternateOrPreviousName?.suffix ?? '',
      honors: patient?.alternateOrPreviousName?.honors ?? '',
    },
    alternateOrPreviousContactDetails:
      patient?.alternateOrPreviousContactDetails
        ? {
            homeAddress:
              patient?.alternateOrPreviousContactDetails?.addresses?.find(
                (addr) => addr.type === 'Home',
              ) ?? { ...initialAddress, type: 'Home' },
          }
        : {
            homeAddress: {
              ...initialAddress,
              type: 'Home' as PatientAddressType,
            },
          },
    language: patient?.language ?? '',
    languageAbility: patient?.languageAbility ?? '',
    languageProficiency: patient?.languageProficiency ?? '',
    religion: patient?.religion ?? '',
    races: patient?.races ?? [],
    ethnicities: patient?.ethnicities ?? [],
    preferredLanguage: patient?.preferredLanguage ?? '',
    chargeUserId: patient?.chargeUserId ?? '',
    isPlusMember: patient?.isPlusMember ?? false,
    hasPhoto: patient?.hasPhoto ?? false,
    chargeKey: patient?.chargeKey ?? '',
    medicalRecordNumber: patient?.medicalRecordNumber ?? '',
    socialSecurityNumber: patient?.socialSecurityNumber ?? '',
    guardian: {
      name: {
        firstName: patient?.guardian?.name?.firstName ?? '',
        lastName: patient?.guardian?.name?.lastName ?? '',
      },
    },
    verificationStatus: patient?.verificationStatus ?? '',
    status: patient?.status ?? '',
  }
}

export {
  applyClientSideFilters,
  getInitialValues,
  cleanPayload,
  isEmptyDriverLicense,
}
