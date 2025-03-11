import { Metadata } from '@/types'

export interface LabResults {
  resultId: string
  resultValue: string
  resultName?: string
  resultUnit: string
  observationTime: string
  metadata: Metadata
}

export interface LabResultResponse {
  testId: string
  testName: string
  resultName?: string
  results: LabResults[]
  orderId: string
  patientId: string
}

export interface LabResultsPayload {
  resourceStatusList: string[]
  dateFrom?: string
  dateTo?: string
  labTestName?: string
  patientId: string
}

export type GroupedResultsByDate = {
  [date: string]: LabResults
}

export interface LabResultSubRow {
  resultName: string
  resultsByDate: GroupedResultsByDate
}

export interface LabResultResponseTransformed
  extends Omit<LabResultResponse, 'results'> {
  subRows: LabResultSubRow[]
}
