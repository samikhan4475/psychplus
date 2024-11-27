import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { Metadata } from '@/types'

enum CredentialingTab {
  License = 'License',
  DEA = 'DEA',
  CSA = 'CSA',
  PrescriberSettings = 'Prescriber Settings',
}

interface DEA {
  metadata?: Metadata
  state: string
  status: string
  license: string
  startDate: DateValue
  endDate: DateValue
  alert: boolean
}

interface DEAResponse extends Omit<DEA, 'startDate' | 'endDate'> {
  startDate: string
  endDate: string
}

type DEARow = Row<DEA>

interface LicenseHistory {
  createdAt: DateValue
  user: string
  status: string
  license: string
  startDate: DateValue
  endDate: DateValue
}

interface LicenseHistoryResponse
  extends Omit<LicenseHistory, 'createdAt' | 'startDate' | 'endDate'> {
  createdAt: string
  startDate: string
  endDate: string
}

type LicenseHistoryRow = Row<LicenseHistory>

export { CredentialingTab }
export type {
  DEA,
  DEARow,
  DEAResponse,
  LicenseHistory,
  LicenseHistoryResponse,
  LicenseHistoryRow,
}
