import { Code, Metadata, MetadataCodeset } from '@/types'

export interface TemplateParameter {
  id?: string
  parameterCode: string
  displayName: string
  resourceStatus: string
  isRequired:boolean
  reportTemplateId?: string
  displayOrder: number
  runValue?: string
  scheduleParameterValue?: string | string[]
  templateParameterId?: string
}

interface Template {
  id?: string
  shortName: string
  displayName: string
  reportCategoryCode: string
  isAdhocAllowed?: boolean
  parameters?: TemplateParameter[]
  permittedRoles?: string[]
  resourceStatus?: string
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
  id: string;
  runValue: string | null;
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
interface GetScheduleReportListResponse {
  scheduleReports: ScheduledReport[]
  total: number
}
interface ScheduleReportListParams {
  templateIds: string[]
  jobIds?: string[]
}

type ParsedCron = {
  beginDate: Date
  repeatInterval: string
  scheduleDays: string[]
  intervalOption: string
  repeatCount: string
}

type ScheduledReport = {
  id: string
  metadata?: Metadata
  resourceStatus: string
  templateId: string
  beginOn: string
  terminateOn: string
  jobId: string
  parameters: TemplateParameter[]
  repeatSchedule: string
  scheduledOn: string
  dataRange: string
  distributionGroups: DistributionGroup[]
  repeatCount: string
  repeatInterval: string
  intervalOption: string
  scheduleDays: string
  forDuration: string
  numberOfDuration: string
  durationInterval: string
  isSchedule: boolean
  reportTemplateId: string
  reportTemplateName: string
  isEnabled: boolean
  cronScheduleJobDefinition: string
  cronExpressionDescription: string
}

interface DistributionGroup {
  id: string
  metadata: Metadata
  resourceStatus: string
  reportScheduleId: string
  distributionGroupId: string
  distributionGroupDisplayName: string
}

type Schedule = {
  beginOn: string | null
  repeatSchedule: string | null
  scheduledOn: string | null
  dataRange: string | null
  terminateOn: string | null
  distributionGroups: string | null
  resourceStatus?: string
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
  MINUTE = 'minute',
  HOUR = 'hour',
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

type CodeType = Record<string, Record<string, Record<string, string>>>
export enum VIEW_TYPE {
  REPORT = 'report',
  SCHEDULE = 'schedule',
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
  CodeType,
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
  Schedule,
  ScheduleReportListParams,
  ScheduledReport,
  GetScheduleReportListResponse,
  ParsedCron,
  DistributionGroup,
}
