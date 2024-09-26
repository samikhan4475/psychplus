import React from 'react'
import { Box } from '@radix-ui/themes'

const RichTextEditorToolbar = () => (
  <Box
    id="toolbar"
    className="flex gap-1 [background:none_!important] [border:none_!important]"
  >
    {/*I used this custom field because the custom design was required, and Radix did not work as expected when I tried using it. */}
    <button className="ql-bold !w-auto"></button>
    <button className="ql-italic !w-auto"></button>
    <button className="ql-header !w-auto" value="1"></button>
    <button className="ql-header !w-auto" value="2"></button>
    <button className="ql-blockquote !w-auto"></button>
    <button className="ql-link !w-auto"></button>
    <button className="ql-attachment !w-auto"></button>
    <button className="ql-list !w-auto" value="ordered"></button>
    <button className="ql-list !w-auto" value="bullet"></button>
  </Box>
)

export { RichTextEditorToolbar }
