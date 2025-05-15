import { LegalName, Metadata } from '@/types'

interface CareTeam {
  careTeamId: number
  staffId: number
  metadata: Metadata
  staffName: LegalName
  isCareManager: boolean
  isMedicalAssistant: boolean
  recordStatus: RecordStatus
}

enum RecordStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
  Archived = 'Archived',
}

interface AddCareTeamMember {
  staffId: number
  providerStaffId: number
  isCareManager: boolean
  isMedicalAssistant: boolean
  recordStatus: RecordStatus
}

export { type CareTeam, type AddCareTeamMember, RecordStatus }
