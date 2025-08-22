import { Gender, Metadata } from '@/types'
import { LegalName } from './name'

export interface Experience {
  appointmentId: number
  metadata: Metadata
  appointmentDateTime: string
  ratingReason?: string
  age: string
  gender: Gender
  dateOfBirth: string
  locationName: string
  visitType: string
  patientName: LegalName
  insuranceName?: string
  rating: string
  staffComments?: string
  isValidateRating?: boolean
}

export type ExperienceFilter = Partial<
  Pick<Experience, 'gender' | 'dateOfBirth' | 'age' | 'visitType' | 'rating'>
> & {
  fromDateTime?: string
  toDateTime?: string
  patientFirstName?: string
  patientLastName?: string
  locationId?: string
  insurancePriority?: string
  appointmentRatingReason?: string
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeLocation?: boolean
  isIncludeEncounterTypes?: boolean
  isIncludePatientData?: boolean
  isIncludePatientFinancialData?: boolean
  isIncludeInsurancePolicies?: boolean
  isIncludeInsurancePlan?: boolean
}
