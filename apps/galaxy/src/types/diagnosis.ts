import { Metadata } from './metadata'

interface DiagnosisResource {
  id?: string
  metadata?: Metadata
  locationId?: string
  serviceId?: string
  diagnosisId: number
  diagnosisCode: string
  diagnosis: string
  resourceStatus?: string
}

interface DiagnosisIcd10Code {
  description: string
  code: string
  id?: string | number
  isFavorite: boolean
  isActive: boolean
  metadata?: Metadata
}

interface FavouriteDiagnosisData {
  id?: number | string
  icd10Code: string
  description: string
  isFavourite: boolean
}

export type { DiagnosisIcd10Code, DiagnosisResource, FavouriteDiagnosisData }
