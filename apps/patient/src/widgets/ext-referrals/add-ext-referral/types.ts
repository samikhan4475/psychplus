import z from 'zod'
import { validate } from '@psychplus/form'
import { SchemaType } from './components/schema'
import { ActionSuccessState } from '@psychplus-v2/api'

enum ExternalReferralDocument {
  RequisitionPdf = 'RequisitionPdf',
  ResultsPdf = 'ResultsPdf',
  EncounterCcd = 'EncounterCcd',
  EncounterPdf = 'EncounterPdf',
  Facesheet = 'Facesheet',
}
enum ReferralType {
  Generic = 'generic',
  Clinic = 'clinic',
  Facility = 'facility',
}

type PhoneNumberType = z.infer<typeof validate.phoneNumberTypeEnum>

interface AddReferralResponse extends SchemaType {
  id: string
  patientId: number
}
interface UploadAttachmentResponse {
  id: string
}

interface PatientExtReferralParams
  extends Omit<
    SchemaType,
    'requestedTime' | 'dischargeTime' | 'patientDateOfBirth'
  > {
  requestedTime?: string
  dischargeTime?: string
  patientDateOfBirth?: string
  patientId?: number
}

type ReferralSuccess = ActionSuccessState<{ id: string; patientId: number }>

export {
  ExternalReferralDocument,
  ReferralType,
  type PhoneNumberType,
  type AddReferralResponse,
  type UploadAttachmentResponse,
  type PatientExtReferralParams,
  type ReferralSuccess,
}
