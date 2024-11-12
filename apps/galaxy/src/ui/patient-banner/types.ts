import { StaffResource } from '@/types'
import { CareTeamMember } from '@/types/care-team'

interface PatientProfile {
  id: string
  mrn: string
}
interface PatientCare {
  primary: boolean
  specialist: string
  staffDetails: StaffResource
}

interface CareTeamResponse {
  careTeam: CareTeamMember[]
}

interface Patientinsurance {
  id: number
  insurancePolicies: InsurancePolicy[]
}

interface InsurancePolicy {
  policyName: string
  insurancePolicyPriority: string
}
export type {
  PatientProfile,
  PatientCare,
  CareTeamResponse,
  Patientinsurance,
  InsurancePolicy,
}
