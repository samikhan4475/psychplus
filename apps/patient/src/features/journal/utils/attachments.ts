import { type JournalAttachment, type UnifiedAttachment } from '../types'

export const convertExistingAttachments = (
  attachments: JournalAttachment[],
): UnifiedAttachment[] => {
  return attachments.map((attachment) => ({
    id: attachment.journalAttachmentId,
    name:
      attachment.fileName ||
      `attachment-${
        attachment.journalAttachmentId
      }.${attachment.fileType.toLowerCase()}`,
    type: attachment.fileType,
    isExisting: true,
    journalAttachmentId: attachment.journalAttachmentId,
  }))
}
