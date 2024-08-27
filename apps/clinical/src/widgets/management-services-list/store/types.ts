import { CodeSetState } from '@psychplus/codeset'
import { type Service } from '@psychplus/management-services/types'

interface ServiceState {
  services: Service[]
  setServices: (value: Service[]) => void
}

type SerivcesStoreType = CodeSetState & ServiceState

export type { ServiceState, SerivcesStoreType }
