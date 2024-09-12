import { CodeSetState } from '@psychplus/codeset'
import { type Dropdown } from './hooks'
import { LabTest } from '../types'

interface LabOrderState extends CodeSetState {
  getDropdowns: (key: string) => Dropdown
  setTests: (value: LabTest[]) => void
  tests: LabTest[]
}


export type { LabOrderState }
