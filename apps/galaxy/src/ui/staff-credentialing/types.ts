import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { LegalName, Metadata } from '@/types'

enum CredentialingTab {
  License = 'License',
  DEA = 'DEA',
  CDS = 'CDS',
  PrescriberSettings = 'Prescriber Settings',
  EPCS = 'EPCS Manger'
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
  firstName:string
  middleName:string
  lastName:string
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

enum ProofingType {
  web = 'WebcamAuthentication',
  mobile = 'MobileAuthentication',
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
  legalName: LegalName
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
  userId: number
}

type GetLicensesResponse = Omit<License, 'startDate' | 'endDate'> & {
  startDate: string | undefined
  endDate: string | undefined
}

interface GetLicensesHistoryResponse {
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

interface NearToExpireLicenseResponse {
  staffId: number
  type: LicenseType
  userId: number
  legalName: LegalName
  licenses: GetLicensesResponse[]
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

type PrescriberKeys =
  | 'Prescriber'
  | 'New'
  | 'Refill'
  | 'Change'
  | 'Cancel'
  | 'PharmacyRXRequest'
  | 'PharmacyRXResponseDenied'
  | 'Controls'
  | 'C2'
  | 'stateCode'
  | 'stateName'

type PrescriberDataResponse = Record<PrescriberKeys, string>
interface PrescriberSettingResponse {
  id: string
  metadata?: Metadata
  settingStatusCode: string
  levelCode: string
  userId: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
  state: string
}
type LicenseHistoryRow = Row<LicenseHistory>


interface GetLicensesActionResponse {
  licenses: GetLicensesResponse
  total: number
}
interface GetIdProofingActionResponse {
 userProofings: GetIdProofingResponse[]
 total: number
}

interface GetIdProofingResponse {
  startedAt:string
  proofingStatus:string
  validFrom:string
  validUntil:string
  requestByStaffname?:StaffData
}

interface StartSelfProofingResponse {
  clientRef: string
  userRef: string
  proofingRef: string
  proofType: string
  status: string
  startedAt: string
  pendingUserAction: boolean
  canResetToResume: boolean
  successfulProofing: boolean
  endedAt: string
  shouldAbandonProofType: boolean
  validFrom: string
  validUntil: string
}

interface LaunchProofingPayload{
  callBackUrl:string
}

interface GetIdProofingActionPayload{
  userId:string
}


interface LaunchProofingResponse{
  launchScreenUrl:string
}

export { CredentialingTab, LicenseStatus, LicenseType, RecordStatus, ProofingType }

export type {
  DEA,
  PrescriberKeys,
  Filters,
  StaffData,
  PrescriberSettingResponse,
  PrescriberDataResponse,
  GetLicensesResponse,
  GetLicensesHistoryResponse,
  License,
  LicenseHistory,
  LicenseHistoryResponse,
  LicenseHistoryRow,
  AddLicensePayload,
  UpdateLicensePayload,
  NearToExpireLicenseResponse,
  GetLicensesActionResponse,
  StartSelfProofingResponse,
  LaunchProofingPayload,
  GetIdProofingActionPayload,
  LaunchProofingResponse,
  GetIdProofingActionResponse,
  GetIdProofingResponse
}
