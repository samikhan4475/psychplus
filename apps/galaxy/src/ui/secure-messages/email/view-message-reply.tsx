import React from 'react'
import { Box } from '@radix-ui/themes'
import { ForwardButton } from './forward-button'
import { ReplyAllButton } from './reply-all-button'
import { ReplyButton } from './reply-button'

const ViewMessageReplyForward = () => {
  return (
    <Box className="mt-4 flex  space-x-2">
      <ReplyAllButton />
      <ReplyButton />
      <ForwardButton />
    </Box>
  )
}

export { ViewMessageReplyForward }
