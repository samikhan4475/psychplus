import z from 'zod'
import { validate } from '@psychplus/form'
import { SchemaType } from './components/schema'

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
  id?: string
}
interface UploadAttachmentResponse {
  id: string
}
export {
  ExternalReferralDocument,
  ReferralType,
  type PhoneNumberType,
  type AddReferralResponse,
  type UploadAttachmentResponse,
}
