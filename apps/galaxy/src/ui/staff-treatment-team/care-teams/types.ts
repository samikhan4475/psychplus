import { LegalName, Metadata } from '@/types'

interface CareTeam {
  careTeamId: number
  staffId: number
  metadata: Metadata
  staffName: LegalName
  isCareManager: boolean
  isMedicalAssistant: boolean
  recordStatus: RecordStatus
  providerId: number
}

enum RecordStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
  Archived = 'Archived',
}

interface AddCareTeamMember {
  staffId: number
  isCareManager: boolean
  isMedicalAssistant: boolean
  recordStatus: RecordStatus
}

export { type CareTeam, type AddCareTeamMember, RecordStatus }
