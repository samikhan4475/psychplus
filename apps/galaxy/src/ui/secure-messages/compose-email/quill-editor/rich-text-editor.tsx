import React from 'react'
import './styles.css'
import { RichTextEditorToolbar } from './rich-text-editor-toolbar'
import { RichTextEditorWrapper } from './rich-text-editor-wrapper'

const RichTextEditor = () => (
  <RichTextEditorWrapper>
    <RichTextEditorToolbar />
  </RichTextEditorWrapper>
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
