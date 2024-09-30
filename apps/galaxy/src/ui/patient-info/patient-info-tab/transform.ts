import {
  ConsentStatus,
  VerificationStatus,
  type PatientConsent,
  type PatientProfileRaw,
} from '@/types'
import {
  getGuardianFirstName,
  getGuardianLastName,
  getPatientDOB,
  getPatientEmail,
  getPatientFirstName,
  getPatientLastName,
  getPatientMiddleName,
  getPatientMRN,
  getPatientPhone,
  getSlashedPaddedDateString,
} from '@/utils'
import { AddRelationshipRequestBody } from './actions'
import { AddRelationshipSchemaType } from './add-relationship-dialog/schema'
import type { PatientProfile } from './types'

const transformIn = (data: PatientProfileRaw): PatientProfile => ({
  id: String(data.id),
  mrn: getPatientMRN(data.id),
  firstName: getPatientFirstName(data.legalName),
  middleName: getPatientMiddleName(data.legalName),
  lastName: getPatientLastName(data.legalName),
  dob: getPatientDOB(data.birthdate),
  phone: getPatientPhone(data.contactDetails.phoneNumbers),
  email: getPatientEmail(data.contactDetails),
  hasGuardian: data.guardian !== undefined,
  guardianFirstName: getGuardianFirstName(data.guardian),
  guardianLastName: getGuardianLastName(data.guardian),
})

const transformOut = (id: string): PatientProfileRaw =>
  ({
    id: Number(id),
  } as PatientProfileRaw)

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
    addresses: data.address
      ? [
          {
            type: 'Home',
            street1: data.address,
            postalCode: String(data.postalCode),
          },
        ]
      : [],
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
    const { id, latestIssuanceDate, issuanceDate, signingDate, type, ...rest } =
      consent

    const formattedConsent: PatientConsent = {
      id: String(id),
      latestIssuanceDate: formatDate(latestIssuanceDate),
      issuanceDate: formatDate(issuanceDate),
      signingDate: formatDate(signingDate),
      type,
      ...rest,
    }

    if (!consentMap[type]) {
      consentMap[type] = { ...formattedConsent, consents: [] }
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

export {
  transformIn,
  transformOut,
  addRelationshipTransformOut,
  patientConsentTransformIn,
}
