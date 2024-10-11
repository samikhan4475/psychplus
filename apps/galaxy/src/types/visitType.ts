import { Metadata } from './metadata'

interface VisitType {
  id: number
  metadata: Metadata
  locationId: string
  serviceId: string
  visitTypeId: number
  visitTypeCode: number
  encouterType: string
  description: string
  typeOfVisit: string
  visitSequence: string
  visitMedium: string
}

export type { VisitType }
