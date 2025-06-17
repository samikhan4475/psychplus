import type { Contact, Metadata } from './shared'

interface Clinic {
  id: string
  metadata?: Metadata
  isTest?: boolean
  name: string
  group?: string
  description?: string
  npi?: string
  contact?: Contact
  taxonomy?: [
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
  distanceInMiles?: number
}

type ClinicsDistancePayload = {
  postalcode: string
  latitude?: number
  longitude?: number
  miles?: number
}

export type { Clinic, ClinicsDistancePayload }
