interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface Immunization {
  id?: string
  metadata?: Metadata
  datetimeAdministered?: string
  cvxCode: string | null | undefined
  mvxCode: string | undefined
  dose?: string | null
  units?: string | null
  expirationDate?: string
  lotNumber?: string | null
  routeCode?: string | null
  siteCode?: string | null
  providerStaffId?: number | string
  entryType?: string
  completionStatusCode?: string | null
  reasonCode?: string | null
  administeringUserId?: string | number | null
  fundingCode?: string
  ndcCode?: string | null
  recordStatus?: string | null
  cvxDescription: string | null | undefined
  mvxDescription?: string | null
  mvxInformation?: string
  vaccineFPE?: string
  manufactureDescription?: string | null
  manufacturInformation?: string | null
  fundingDescription?: string | null
  administeredCode?: string
  administeringUserFullName?: string
  appointmentId?: number
  FundingClass?: string
}

interface ImmunizationPayload {
  payload: Immunization
  appointmentId: number | string
}

interface CvxCodes {
  id: string
  cvxCode: string
  mvxCode: string
  ndcCode: string
}

export type OptionType = {
  label: string
  value: string
}

export interface RealCodeSet {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  namespace: string
  displayName: string
  oid: string
  viewPermissionCode: string
  editPermissionCode: string
  codesets: Codeset[]
}

export interface Codeset {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  assigningAuthorityId: string
  codeSystemName: string
  displayName: string
  oid: string
  codes: Code[]
  version?: string
}

export interface Code {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  codesetId: string
  code: string
  displayName: string
  codeAttributes?: CodeAttribute[]
  groupingCode?: string
}

export interface CodeAttribute {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  codeId: string
  name: string
  content: string
}

export interface CodeSetsMetadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
}

type Option = {
  value: string
  label: string
}

export const COLUMN_DATE_FORMAT = 'MM/dd/yyyy'
export const DATE_FORMAT = 'yyyy-MM-dd'

export enum RealCodesets {
  MVX = 'PH_ManufacturersOfVaccinesMVX_CDC_NIP',
  INFORMATION_SOURCE = 'PHVS_ImmunizationInformationSource_HITSP',
  CVX = 'CVX',
  FUNDING_CLASS = 'PHVS_FinancialClass_IIS',
  FIELD_ID = 'ordering-provider-selector',
  REFUSALREASON = 'FHIM_ImmunizationRefusalReason'
}

export type { Option, Immunization, ImmunizationPayload, CvxCodes }
