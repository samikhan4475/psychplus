import { Metadata } from '@/types'

enum CodingTab {
  ICD = 'ICD',
  CPT = 'Master Fee Schedule',
  Modifier = 'Modifier',
  POS = 'POS',
}

interface CPT {
  id: string
  gender: string
  category: string
  minimumAge: string
  maximumAge: string
  effectiveFrom: string
  effectiveTill: string
  metadata: Metadata
  placeOfService: string
  recordStatus: string
  cptCode: string
  description: string
  requirement: string
  mastersAmount: string
  paAmount: string
  npAmount: string
  psyDAmount: string
  medicareAmount: string
  mdDoAmount: string
  paDAmount: string
}

interface PosList {
  code: string
  description: string
}

interface CptListResponse {
  cptList: CPT[]
  total: number
}

interface MasterFeeScheduleFilter {
  cptCode?: string[]
  placeOfService?: string
  description?: string
  requirement?: string
  category?: string
  gender?: string
  recordStatus?: string
  minimumAge?: string
  maximumAge?: string
}

export {
  CodingTab,
  type PosList,
  type CptListResponse,
  type CPT,
  type MasterFeeScheduleFilter,
}
