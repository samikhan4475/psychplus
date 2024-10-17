import { Metadata } from '@/types'

interface ClaimSubmissionDetail {
  id: string
  metadata: Metadata
  recordStatus: string
  batchId: string
  claimId: string
  status: string
  coverage: string
  amount: number
}
interface ClaimSubmissionHistoryDetail {
  id: string
  metadata: Metadata
  recordStatus: string
  batchId: string
  claimId: string
  status: string
  coverage: string
  amount: number
  patientName: string
  claimNumber: string
  dateOfServiceFrom: string
}
interface ClaimSubmissionHistory {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceId: string
  submitterId: string
  receiverId: string
  batchName: string
  batchType: string
  batchStatus: string
  batchStatusDetail: string
  submittedDate: Date
  processedDate: Date
  isProcessed: boolean
  isPaper: boolean
  claimCount: number
  totalAmount: number
  ak9Error: string
  ak9Status: string
  ik5Error: string
  ik5Status: string
  isaControlNumber: string
  notes: string
  transaction837Path: string
  claimSubmissionDetail: ClaimSubmissionDetail[]
}
interface SearchSubmissionHistoryData {
  submissionHistory: ClaimSubmissionHistory[]
  total: number
}

export type {
  ClaimSubmissionHistory,
  ClaimSubmissionHistoryDetail,
  SearchSubmissionHistoryData,
}
