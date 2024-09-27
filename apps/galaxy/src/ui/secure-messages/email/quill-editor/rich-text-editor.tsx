import React from 'react'
import './styles.css'
import { ActiveComponent } from '../../types'
import { RichTextEditorToolbar } from './rich-text-editor-toolbar'
import { RichTextEditorWrapper } from './rich-text-editor-wrapper'

const RichTextEditor = ({
  activeComponent,
}: {
  activeComponent?: ActiveComponent
}) => (
  <RichTextEditorWrapper activeComponent={activeComponent}>
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
