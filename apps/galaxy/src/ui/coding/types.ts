import { Metadata } from '@/types'

enum CodingTab {
  ICD = 'ICD',
  CPT = 'Master Fee Schedule',
  Modifier = 'Modifier',
  POS = 'POS',
}

interface CPT {
  id: string
  gender: string
  category: string
  minimumAge: string
  maximumAge: string
  effectiveFrom: string
  effectiveTill: string
  metadata: Metadata
  placeOfService: string
  recordStatus: string
  cptCode: string
  description: string
  requirement: string
  mastersAmount: string
  paAmount: string
  npAmount: string
  psyDAmount: string
  medicareAmount: string
  mdDoAmount: string
  paDAmount: string
}

interface PosList {
  code: string
  description: string
}

interface CptListResponse {
  cptList: CPT[]
  total: number
}

interface MasterFeeScheduleFilter {
  cptCode?: string[]
  placeOfService?: string
  description?: string
  requirement?: string
  category?: string
  gender?: string
  recordStatus?: string
  minimumAge?: string
  maximumAge?: string
}

interface TaskRunResponse {
  id: string
  recordStatus: string
  taskDefinitionId: string
  status: string
  runBegin: string
  runEnd: string
  removeAfter: string
  percentageComplete: number
  totalCount: number
  successCount: number
  failedCount: number
  skippedCount: number
  parameters: TaskRunParameter[]
  job: Job
  taskDefinition: TaskDefinition
  taskRunOutput: string[]
}

interface TaskRunParameter {
  taskRunId: string
  parameterId: string
  parameterName: string
  valueContent: string
}

interface Job {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  category: string
  isEnabled: boolean
  scheduleType: string
  cronScheduleDefinition: string
  runHistoryExpireDays: number
  nextExecutionTime: string
  taskDefinitions: TaskDefinition[]
}

interface TaskDefinition {
  id: string
  metadata: Metadata
  recordStatus: string
  jobId: string
  displayName: string
  implementationKey: string
  parameters: ParameterDefinition[]
}

interface ParameterDefinition {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  dataType: string
  usageType: string
  isRequired: boolean
  defaultValueContent: string
}

interface FailureDetail {
  propertyName: string
  errorMessage: string
  errorCode: string
}

interface FailureInfo {
  code: string
  message: string
  status: string
  details: FailureDetail[]
}

interface MasterFreeUploadResponse {
  filename: string
  taskRunId: string
  statusUrl: string
  failure: FailureInfo
}
export {
  CodingTab,
  type TaskRunResponse,
  type PosList,
  type CptListResponse,
  type CPT,
  type MasterFeeScheduleFilter,
  type MasterFreeUploadResponse,
}
