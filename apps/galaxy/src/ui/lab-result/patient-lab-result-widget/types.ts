import { LabResult, Metadata } from '@/types'

export interface LabResults {
  resultId: string
  resultValue: string
  resultName?: string
  resultUnit: string
  observationTime: string
  recomendedValue: string
  labName: string
  metadata: Metadata
}

export interface LabResultResponse {
  testId: string
  testName: string
  resultName?: string
  results: LabResult[]
  orderId: string
  patientId: string
  labName?: string
}

export interface LabResultTableData {
  testName: string
  resultId: string
  resultValue: string
  resultName?: string
  resultUnit: string
  observationTime: string
  recomendedValue: string
  labName: string
}

export interface LabResultsPayload {
  resourceStatusList: string[]
  dateFrom?: string
  dateTo?: string
  labTestName?: string
  patientId: string
  isIncludeLabOrder?: boolean
  isIncludeLabLocation?: boolean
  isIncludeTests?: boolean
}

export type GroupedResultsByDate = {
  [date: string]: LabResult
}

export interface LabResultSubRow {
  resultName: string
  resultsByDate: GroupedResultsByDate
}

export interface LabResultResponseTransformed
  extends Omit<LabResultResponse, 'results'> {
  subRows: LabResultSubRow[]
}
