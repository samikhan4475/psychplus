import { Appointment, StaffResource } from '@/types'
import { CareTeamMember } from '@/types/care-team'
import { ExternalProvider, ExternalProviderDetail } from '../pcp'
import { Pharmacy } from '../pharmacy/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { PatientVital } from '../vitals'

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

interface PatientDemographicResponse {
  vitals: PatientVital[]
  careTeam: CareTeamMember[]
  allergies: Allergy[]
  externalProviders: ExternalProviderDetail[]
  pharmacies: Pharmacy[]
  appointment?: Appointment
}

export type {
  PatientProfile,
  PatientCare,
  CareTeamResponse,
  Patientinsurance,
  InsurancePolicy,
  PatientDemographicResponse,
}
