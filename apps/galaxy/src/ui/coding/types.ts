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
  medicareAmount: string
  mdDoAmount: number
  npPaAmount: number
  paDAmount: number
  mastersAmount: number
}

interface PosList {
  code: string
  description: string
}

interface CptListResponse {
  cptList: CPT[]
  total: number
}
export { CodingTab, type PosList, type CptListResponse, type CPT }
