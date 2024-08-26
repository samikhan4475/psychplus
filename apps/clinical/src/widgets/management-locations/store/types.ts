import { CodeSetState } from '@psychplus/codeset'
import { type Location } from '@psychplus/management-locations/types'

interface LocationsState {
  locations: Location[]
  setLocations: (value: Location[]) => void
}

type LocationsStoreType = CodeSetState & LocationsState

export type { LocationsState, LocationsStoreType }
