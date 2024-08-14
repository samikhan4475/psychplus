interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface Procedure {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  procedureDate?: string
  procedureCode?: string
  symptomCodesetUsed?: string
  comments?: string
  status?: string
  targetSiteCode?: string
  targetSiteDescription?: string
  noteId?: number
  patientId?: number
  procedureCodeDescription?: string
}

interface PatientParams {
  patientId: number
  noteId: number
}

interface ProcedurePayload {
  patientId: number | string
  payload: Procedure
}

const CODING_SYSTEMS = [
  { value: 'ICD', label: 'ICD' },
  { value: 'Snomed', label: 'Snomed' },
]

type OptionType = {
  value: string
  label: string
}

export interface Provider {
  id: number
  code: string
  description: string
}

export interface TransformedData {
  description: string
  id: string
  code: string
}

export interface ProcedureFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: Procedure
}

export enum TcpTypeEnum {
  Modifier = 'Modifier'
}

export {
  type Procedure,
  type ProcedurePayload,
  type OptionType,
  type PatientParams,
  CODING_SYSTEMS,
}
