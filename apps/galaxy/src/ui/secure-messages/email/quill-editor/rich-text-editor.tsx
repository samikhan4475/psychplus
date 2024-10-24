import React from 'react'
import './styles.css'
import { FormFieldError } from '@/components'
import { AttachmentProps } from '../../types'
import { RichTextEditorToolbar } from './rich-text-editor-toolbar'
import { RichTextEditorWrapper } from './rich-text-editor-wrapper'

const RichTextEditor = ({ attachments, setAttachments }: AttachmentProps) => (
  <>
    <RichTextEditorWrapper
      attachments={attachments}
      setAttachments={setAttachments}
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
