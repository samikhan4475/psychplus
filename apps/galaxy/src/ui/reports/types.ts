import { Code, Metadata, MetadataCodeset } from '@/types'

export interface TemplateParameter {
  id?: string
  parameterCode: string
  displayName: string
  resourceStatus: string
  reportTemplateId?: string
  displayOrder: number
  runValue?: string
}

interface Template {
  id?: string
  shortName: string
  displayName: string
  reportCategoryCode: string
  isAdhocAllowed?: boolean
  parameters?: TemplateParameter[]
  permittedRoles?: string[]
}

interface CodeAttributes {
  metadata?: MetadataCodeset
  name: string
  content: string
}

type CodeSetIndex = { [key: string]: Code[] | undefined }

interface ParameterCodeSet {
  code: string
  metadata: MetadataCodeset
  displayName: string
  codeAttributes: CodeAttributes[]
}
interface Parameter {
  codeSystemName: string
  displayName: string
  codes: ParameterCodeSet[]
}

interface ReportFilterParameters {
  id: string
  runValue: string
}
interface StaffDataOptions {
  value: string
  label: string
}
interface ScheduleJob {
  id?: string
  cronScheduleDefinition: string
  runHistoryExpireDays: number
  shortName?: Date | string | null
  displayName?: string
}
interface SchedulingReport {
  templateId?: string
  beginOn: string | null
  terminateOn?: string | null
  parameters: {
    templateParameterId: string
    reportTemplateId: string | undefined
    scheduleParameterValue: string
  }[]
  distributionGroups: {
    distributionGroupId: string
    reportScheduleId?: string
  }[]
  jobId?: string
}

interface UserGroup {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
}
interface GetReportListResponse {
  report: string
  total: number
}
interface GeneratedReportParams {
  templateId: string
  reportType: string
  data?: ReportFilterParameters[]
}

export enum CODE_PARAM_ATTRIBUTES {
  DATA_TYPE = 'DataType',
  TEXTBOX = 'TextBox',
  DATE = 'Date',
  SELECTION = 'Selection',
}

export enum REPORT_TYPE {
  HTML = 'HTML',
  CSV = 'CSV',
  PDF = 'PDF',
  EXCEL = 'EXCEL',
}
export enum STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum INTERVAL {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
export enum REPEAT_INTERVAL {
  NOREPEAT = 'notrepeat',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  SIX = '6',
}
export enum STAFF_SELECTION {
  STAFF_SELECTION_SPECIALIST_TYPE = 'StaffSelectionSpecialistType',
  SPECIALIST_TYPE = 'SpecialistType',
}

export enum REPORT_PARAMETER_CODE {
  STAFF_SELECTION_LIST = 'StaffSelectionList',
  SPECIALLIST_TYPE_LIST = 'SpecialistTypeList',
  STAFF_LIST = 'StaffList',
  INSURANCE_LIST = 'InsuranceList',
  PATIENT_LIST = 'PatientList',
  COSIGNER_LIST = 'CosignerList',
}
export type {
  Template,
  Parameter,
  CodeSetIndex,
  ReportFilterParameters,
  ParameterCodeSet,
  StaffDataOptions,
  ScheduleJob,
  SchedulingReport,
  UserGroup,
  GeneratedReportParams,
  GetReportListResponse,
}
