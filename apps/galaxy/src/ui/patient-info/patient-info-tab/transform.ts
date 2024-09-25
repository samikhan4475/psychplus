import type { PatientProfileRaw } from '@/types'
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

export { transformIn, transformOut, addRelationshipTransformOut }
