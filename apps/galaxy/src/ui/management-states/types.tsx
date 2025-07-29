import { Metadata } from '@/types'

interface PrimaryLocation {
  display: string
  contactMade?: string
  locationId: string
  stateCode: string
  id?: string
  dateTime?: string
  userName?: string
  locationName?: string
  metadata?: Metadata
}

type TableData = {
  display: string
  stateCode: string
  locationId?: string
}

export type { PrimaryLocation, TableData }
