import React from 'react'
import './styles.css'
import { FormFieldError } from '@/components'
import { AttachmentProps } from '../../types'
import { RichTextEditorToolbar } from './rich-text-editor-toolbar'
import { RichTextEditorWrapper } from './rich-text-editor-wrapper'

const RichTextEditor = ({
  attachments,
  setAttachments,
  removeAttachment,
  uploadingAttachmentIds,
  deletingAttachmentIds,
  setDeletingAttachmentIds,
}: AttachmentProps) => (
  <>
    <RichTextEditorWrapper
      attachments={attachments}
      setAttachments={setAttachments}
      removeAttachment={removeAttachment}
      uploadingAttachmentIds={uploadingAttachmentIds}
      deletingAttachmentIds={deletingAttachmentIds}
      setDeletingAttachmentIds={setDeletingAttachmentIds}
    >
      <RichTextEditorToolbar />
    </RichTextEditorWrapper>
    <FormFieldError name="text" />
  </>
)

export { RichTextEditor }

RichTextEditor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      attachment: function () {
        const fileInput = document.getElementById(
          'fileInput',
        ) as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
          fileInput.click()
        }
      },
    },
  },
}
