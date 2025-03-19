import { DateValue } from 'react-aria-components'
import { LegalName, Metadata } from '@/types'

enum CredentialingTab {
  StateLicense = 'State License',
  DEA = 'DEA',
  CDS = 'CDS',
}

enum LicenseType {
  License = 'License',
  DEA = 'Dea',
  CDS = 'Csa',
}

enum LicenseStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Na = 'Na',
}

enum RecordStatus {
  Active = 'Active',
  InActive = 'InActive',
}

interface Filters {
  providerStaffIds?: number[]
  stateCodes?: string[]
  license?: string
  statuses?: LicenseStatus[] | null
  licenseTypes: LicenseType[]
  startDate?: string | null
  endDate?: string | null
  recordStatuses?: string[]
  isAlert?: string
  isUseTodayEndDateFilter?: boolean
}

interface License {
  id: string
  metadata?: Metadata
  stateCode: string
  stateId?: string
  stateName?: string
  licenseNumber: string
  licenseType: LicenseType
  startDate: DateValue | undefined
  endDate: DateValue | undefined
  status: LicenseStatus
  isAlertCheck: boolean
  recordStatus: RecordStatus
  isCDSState?: boolean
  staffId: number
  userId: number
  legalName: LegalName
}

type GetLicensesResponse = (Omit<License, 'startDate' | 'endDate'> & {
  startDate: string | undefined
  endDate: string | undefined
})[]

interface GetLicensesActionResponse {
  licenses: GetLicensesResponse
  total: number
}

export {
  CredentialingTab,
  LicenseType,
  LicenseStatus,
  RecordStatus,
  type License,
  type Filters,
  type GetLicensesResponse,
  type GetLicensesActionResponse,
}
