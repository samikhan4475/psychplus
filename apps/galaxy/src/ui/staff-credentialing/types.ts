import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { LegalName, Metadata } from '@/types'

enum CredentialingTab {
  License = 'License',
  DEA = 'DEA',
  CDS = 'CDS',
  PrescriberSettings = 'Prescriber Settings',
}

enum LicenseType {
  License = 'License',
  DEA = 'Dea',
  CDS = 'Csa',
}

type Filters = {
  staffId: number
  status: LicenseStatus
  licenseType: LicenseType
}
type StaffData = {
  staffId: number
  userId: number
  legalName: LegalName
} | null

enum LicenseStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Na = 'Na',
}

enum RecordStatus {
  Active = 'Active',
  InActive = 'InActive',
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

interface License {
  id: string
  metadata?: Metadata
  stateCode: string
  stateId?: string
  stateName?: string
  providerStaffId: number
  licenseNumber: string
  licenseType: LicenseType
  startDate: DateValue | undefined
  endDate: DateValue | undefined
  status: LicenseStatus
  isAlertCheck: boolean
  recordStatus: RecordStatus
  isCDSState?: boolean
}

interface GetLicensesResponse {
  staffId: number
  userId: number
  legalName: LegalName
  licenses: (Omit<License, 'startDate' | 'endDate'> & {
    startDate: string | undefined
    endDate: string | undefined
  })[]
}

interface UpdateLicensePayload extends Omit<License, 'startDate' | 'endDate'> {
  startDate: string | undefined
  endDate: string | undefined
}

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

interface AddLicensePayload {
  stateCode: string
  providerStaffId: number
  licenseNumber: string
  licenseType: LicenseType
  startDate: string | undefined
  endDate: string | undefined
  isAlertCheck: boolean
  status: LicenseStatus
  recordStatus: RecordStatus
}

type LicenseHistoryRow = Row<LicenseHistory>

export { CredentialingTab, LicenseStatus, LicenseType, RecordStatus }

export type {
  DEA,
  Filters,
  StaffData,
  GetLicensesResponse,
  License,
  LicenseHistory,
  LicenseHistoryResponse,
  LicenseHistoryRow,
  AddLicensePayload,
  UpdateLicensePayload,
}
