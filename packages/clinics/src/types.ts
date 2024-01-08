import type { Contact, Metadata } from './shared'

interface Clinic {
  id: number
  metadata?: Metadata
  isTest?: boolean
  name: string
  group?: string
  description?: string
  npi?: string
  contact?: Contact
  taxonomy: [
    {
      code: string
      display: string
      metadata: Metadata
      attributes: [
        {
          name: string
          value: string
        },
      ]
    },
  ]
  distanceInMiles: 0
}

type ClinicsDistanceRequest = {
  postalcode: number
  latitude?: number
  longitude?: number
  miles?: number
}

export type { Clinic, ClinicsDistanceRequest }
