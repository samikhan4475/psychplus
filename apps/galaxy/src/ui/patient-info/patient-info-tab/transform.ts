import {
  ConsentStatus,
  PatientAddressType,
  PatientProfile,
  VerificationStatus,
  type PatientConsent,
} from '@/types'
import { convertToTimeZoneDate, getSlashedPaddedDateString } from '@/utils'
import { AddRelationshipRequestBody } from './actions'
import { AddRelationshipSchemaType } from './add-relationship-dialog/schema'
import { PatientInfoSchemaType } from './patient-info-schema'

const transformOut = (
  data: PatientInfoSchemaType,
  profileImage?: File,
  driverLicenseImage?: File,
): PatientProfile => {
  const contactPhoneNumbers = [
    data?.contactDetails.homeNumber,
    data?.contactDetails.workNumber,
    data?.contactDetails.mobileNumber,
  ].filter((contact) => contact.number)
  const mailingAddress = data.contactDetails.isMailingAddressSameAsPrimary
    ? {
        ...data?.contactDetails.homeAddress,
        type: 'Mailing' as PatientAddressType,
      }
    : data?.contactDetails.mailingAddress
  const contactAddresses = [data?.contactDetails.homeAddress, mailingAddress]
  const alternateAddresses = data.alternateOrPreviousContactDetails
    ? [data?.alternateOrPreviousContactDetails?.homeAddress]
    : null

  const body = {
    ...data,
    contactDetails: {
      email: data?.contactDetails.email,
      phoneNumbers: contactPhoneNumbers ?? [],
      addresses: contactAddresses ?? [],
      isMailingAddressSameAsPrimary:
        data?.contactDetails?.isMailingAddressSameAsPrimary,
    },
    alternateOrPreviousContactDetails: alternateAddresses
      ? {
          addresses: alternateAddresses,
        }
      : null,
  }
  if (driverLicenseImage && data.driversLicense)
    data.driversLicense.hasFrontImage = true
  if (profileImage) data.hasPhoto = true

  if (
    !data?.alternateOrPreviousName?.firstName &&
    !data?.alternateOrPreviousName?.lastName
  ) {
    body.alternateOrPreviousName = null
  }
  if (!data.alternateOrPreviousContactDetails?.homeAddress?.postalCode) {
    body.alternateOrPreviousContactDetails = null
  }

  if (!data.hasGuardian) {
    delete body.guardian
  }

  return body
}

const addRelationshipTransformOut = (
  patientId: string,
  data: AddRelationshipSchemaType,
): AddRelationshipRequestBody => ({
  guardianRelationshipCode: data.relationship,
  patientId: parseInt(patientId),
  name: {
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
  },
  isEmergencyContact: data.isEmergencyContact,
  isAllowedToReleaseInformation: data.isAllowedToReleaseInformation,
  isGuardian: data.isGuardian,
  contactDetails: {
    email: data.email,
    phoneNumbers: [
      {
        number: data.phone,
        type: 'Home',
      },
    ],
    ...data.contactDetails,
  },
})

const patientConsentTransformIn = (
  data: PatientConsent[],
): PatientConsent[] => {
  const formatDate = (date: string | undefined) =>
    date ? getSlashedPaddedDateString(date) : ''

  const consentMap: Record<
    string,
    PatientConsent & { consents?: PatientConsent[]; status?: string }
  > = {}

  data.forEach((consent) => {
    const {
      id,
      latestIssuanceDate,
      issuanceDate,
      signingDate,
      timeZoneId,
      type,
      ...rest
    } = consent

    const formattedConsent: PatientConsent = {
      id: String(id),
      latestIssuanceDate: formatDate(latestIssuanceDate),
      issuanceDate: formatDate(issuanceDate),
      signingDate: formatDate(convertToTimeZoneDate(signingDate, timeZoneId)),
      timeZoneId,
      type,
      ...rest,
      latestIssuanceDateWithoutFormatting: latestIssuanceDate,
      issuanceDateWithoutFormatting: issuanceDate,
      signingDateWithoutFormatting: signingDate,
    }
    if (!consentMap[type]) {
      if (formattedConsent.verificationStatus === VerificationStatus.Verified) {
        formattedConsent.status = ConsentStatus.Yes
        consentMap[type] = {
          ...formattedConsent,
          consents: [{ ...formattedConsent }],
        }
      } else {
        consentMap[type] = { ...formattedConsent, consents: [] }
      }
    } else {
      switch (formattedConsent.verificationStatus) {
        case VerificationStatus.Pending:
          formattedConsent.status = ConsentStatus.Pending
          break
        case VerificationStatus.Verified:
          formattedConsent.status = ConsentStatus.Yes
          break
        case VerificationStatus.Unverifiable:
        default:
          formattedConsent.status = ConsentStatus.No
          break
      }
      consentMap[type].consents!.push(formattedConsent)
    }
  })
  Object.values(consentMap).forEach((consent) => {
    const isLatestSigned = !!consent.signingDate && !consent.isNeedsNewSignature
    const hasSignedConsent = consent.consents?.some(
      (item) => !!item.signingDate,
    )
    const isLatestNotSigned = !consent.signingDate

    if (!hasSignedConsent && isLatestNotSigned) {
      consent.status = ConsentStatus.No
    } else if (isLatestSigned) {
      consent.status = ConsentStatus.Yes
    } else {
      consent.status = ConsentStatus.Pending
    }
  })

  return Object.values(consentMap)
}

export { transformOut, addRelationshipTransformOut, patientConsentTransformIn }
