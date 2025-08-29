import { Metadata } from '@/types'

enum PayerTabs {
  Payer = 'Payer',
  Plan = 'Plan',
  EDI = 'Insurance Plan EDI Setup',
  PlanDetails = 'Plan#',
}

enum FileFormats {
  PDF = 'pdf',
  EXCEL = 'xlsx',
}

interface PayerAuditHistory {
  payerId: string
  recordStatus: string
  metadata: Metadata
  payerName: string
}

interface PayerAuditHistoryPayload {
  payerId?: string
  payerName?: string
  recordStatus?: string
  fromDateTime?: string
  toDateTime?: string
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
}

interface PayerAuditHistoryFilterFormProps {
  onFilterSubmit: (data?: PayerAuditHistoryPayload) => void
}

export {
  PayerTabs,
  FileFormats,
  type PayerAuditHistory,
  type PayerAuditHistoryPayload,
  type PayerAuditHistoryFilterFormProps,
}
