import { Metadata } from './metadata'

type FacesheetRecordStatus = 'Active' | 'Inactive' | 'Deleted'
interface Facesheet {
  facilityAdmissionDetailId: string
  legalName: {
    firstName: string
    middleName?: string
    lastName: string
    honors?: string
  }
  id: string
  metadata: Metadata
  recordStatus: FacesheetRecordStatus
  appointmentId: number
  facilityAdmissionId: string
  patientId: number
  isHasFaceSheetDocument: boolean
  documentType: string
}

interface UploadFacesheetParams {
  patientId: string
  formData: FormData
}

interface UpdateFacesheetParams {
  patientId: number
  facesheetId: string
  payload: {
    recordStatus: FacesheetRecordStatus
    isHasFaceSheetDocument: boolean
    patientId: number
  }
}
export type {
  Facesheet,
  UploadFacesheetParams,
  UpdateFacesheetParams,
  FacesheetRecordStatus,
}
