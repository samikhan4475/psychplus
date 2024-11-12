import { Metadata } from '@/types'
import { StaffResource } from './staff'

interface CareTeamMember {
  id: number
  metadata: Metadata
  primary: boolean
  admin: boolean
  specialist: string
  medicalAssistant: boolean
  staffDetails: StaffResource
}

export type { CareTeamMember }
