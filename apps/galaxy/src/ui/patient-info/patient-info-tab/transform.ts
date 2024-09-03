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
import { PatientInfoSchema } from './patient-info-schema'
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

export { transformIn, transformOut }
