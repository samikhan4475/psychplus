import React from 'react'
import { Box, Tooltip } from '@radix-ui/themes'

const RichTextEditorToolbar = () => (
  <Box
    id="toolbar"
    className="flex gap-1 [background:none_!important] [border:none_!important]"
  >
    {/*I used this custom field because the custom design was required, and Radix did not work as expected when I tried using it. */}
    <Tooltip content="Bold" side="top">
      <button className="ql-bold !w-auto"></button>
    </Tooltip>
    <Tooltip content="Italic" side="top">
      <button className="ql-italic !w-auto"></button>
    </Tooltip>
    <Tooltip content="Header 1" side="top">
      <button className="ql-header !w-auto" value="1"></button>
    </Tooltip>
    <Tooltip content="Header 2" side="top">
      <button className="ql-header !w-auto" value="2"></button>
    </Tooltip>
    <Tooltip content="Blockquote" side="top">
      <button className="ql-blockquote !w-auto"></button>
    </Tooltip>
    <Tooltip content="Link" side="top">
      <button className="ql-link !w-auto"></button>
    </Tooltip>
    <Tooltip content="Attachment" side="top">
      <button className="ql-attachment !w-auto"></button>
    </Tooltip>
    <Tooltip content="List" side="top">
      <button className="ql-list !w-auto" value="ordered"></button>
    </Tooltip>
    <Tooltip content="List" side="top">
      <button className="ql-list !w-auto" value="bullet"></button>
    </Tooltip>
  </Box>
)

export { RichTextEditorToolbar }
