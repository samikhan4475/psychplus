import { Metadata } from './metadata'

interface EncounterToService {
  id: string
  encounterId: number
  locationType: string
  serviceOffered: string
}
interface CPTPrimaryCode {
  code: string
  isDefault: boolean
  isDisabled: boolean
}

interface Encounter {
  id: number
  metadata: Metadata
  encounterName: string
  description: string
  duration: number
  isForNewPatient: boolean
  typeOfVisit: string
  visitSequence: string
  visitMedium: string
  resourceStatus: string
  visitTypeCode?: string
  encounterToServices: EncounterToService[]
  visitDurationsInMinutes?: number[]
  visitNoteTitle: string
  cptPrimaryCodes?: CPTPrimaryCode[]
}

export type { CPTPrimaryCode, EncounterToService, Encounter }
