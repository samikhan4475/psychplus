import { Metadata } from 'next/types'

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
