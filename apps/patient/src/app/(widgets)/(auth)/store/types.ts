import { CodeSetState } from '@psychplus/codeset'
import { type PatientState } from '@psychplus/patient'

type StoreType = PatientState & CodeSetState

export type { StoreType }
