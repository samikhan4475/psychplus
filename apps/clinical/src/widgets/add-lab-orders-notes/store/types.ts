import { CodeSetState } from '@psychplus/codeset'
import { type Dropdown } from './hooks'
import { LabTest } from '../types'
import { Code, LabRecord } from '@psychplus/lab-orders/types'

interface LabTestsState extends CodeSetState {
  tests: LabTest[]
  labOrders: LabRecord[]
  setLabOrders: (value: LabRecord[]) => void
  setTests: (value: LabTest[]) => void
  getDropdowns: (key: string) => Dropdown
  resultFlags: Code[]
  resultStatus: Code[]
  resultUnits: Code[]
  setResultFlags: (resultFlags: Code[]) => void
  setResultStatus: (resultStatus: Code[]) => void
  setResultUnits: (resultUnits: Code[]) => void
}

export type { LabTestsState, }
