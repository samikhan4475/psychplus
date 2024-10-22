import { Metadata } from './metadata'

interface Organization {
  id: string
  metadata?: Metadata
  shortName: string
  displayName: string
  recordStatus: string
}

export type { Organization }
