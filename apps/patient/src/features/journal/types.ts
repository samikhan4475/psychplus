import { Metadata } from '@psychplus-v2/types'

interface JournalAttachment {
  journalAttachmentId: string
  metadata: Metadata
  recordStatus: string
  journalId: string
  attachmentUrl: string
  fileType: string
  fileName?: string
}

interface ExistingAttachment {
  journalAttachmentId: string
  metadata: Metadata
  recordStatus: string
  journalId: string
  fileType: string
  fileName?: string
  fileUrl?: string
}

interface UnifiedAttachment {
  id: string
  file?: File
  name: string
  type: string
  url?: string
  isExisting: boolean
  journalAttachmentId?: string
}

interface JournalNote {
  noteId: string
  metadata: Metadata
  journalId: string
  noteText: string
  sequence: number
}

interface CreateJournalRequest {
  journalId?: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedOn: string
    updatedBy: number
    updatedByFullName: string
    deletedOn?: string
    deletedBy?: number
    deletedByFullName?: string
  }
  recordStatus: string
  patientId: number
  title: string
  notes: string
  journalNotes: JournalNote[]
  attachments: JournalAttachment[]
}

interface CreateJournalResponse {
  journalId: string
  metadata: Metadata
  recordStatus: string
  patientId: number
  title: string
  notes: string
  journalNotes: JournalNote[]
  attachments: JournalAttachment[]
}

interface SearchJournalRequest {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: number
  journalId?: string
  fromDate?: string
  toDate?: string
  recordStatuses?: string[]
  isIncludePatient?: boolean
  isIncludeAttachments?: boolean
  isIncludeNotes?: boolean
}

interface SearchJournalResponse {
  journalId: string
  metadata: Metadata
  recordStatus: string
  patientId: number
  title: string
  notes: string
  journalNotes: JournalNote[]
  attachments: JournalAttachment[]
}

interface UpdateJournalRequest {
  journalId: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedOn: string
    updatedBy: number
    updatedByFullName: string
    deletedOn?: string
    deletedBy?: number
    deletedByFullName?: string
  }
  recordStatus: string
  patientId: number
  title: string
  notes: string
  journalNotes: JournalNote[]
  attachments: JournalAttachment[]
}

interface UpdateJournalResponse {
  journalId: string
  metadata: Metadata
  recordStatus: string
  patientId: number
  title: string
  notes: string
  journalNotes: JournalNote[]
  attachments: JournalAttachment[]
}

interface UploadAttachmentResponse {
  success: boolean
  message?: string
  attachments?: JournalAttachment[]
}

interface DeleteAttachmentResponse {
  success: boolean
  message?: string
}

export type { 
  CreateJournalRequest, 
  CreateJournalResponse, 
  JournalAttachment, 
  JournalNote,
  SearchJournalRequest,
  SearchJournalResponse,
  UpdateJournalRequest,
  UpdateJournalResponse,
  ExistingAttachment,
  UnifiedAttachment,
  UploadAttachmentResponse,
  DeleteAttachmentResponse
} 