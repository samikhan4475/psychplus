import React from 'react'
import { Box } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ActiveComponent } from '../../types'
import { ForwardButton } from '../forward-button'
import { ReplyAllButton } from '../reply-all-button'
import { ReplyButton } from '../reply-button'

const ViewMessageReplyForward = () => {
  const { setActiveComponent } = useStore((state) => state)

  return (
    <Box className="mt-4 flex  space-x-2">
      <ReplyAllButton
        onClick={() => setActiveComponent(ActiveComponent.REPLY_TO_ALL)}
      />
      <ReplyButton onClick={() => setActiveComponent(ActiveComponent.REPLY)} />
      <ForwardButton
        onClick={() => setActiveComponent(ActiveComponent.FORWARD)}
      />
    </Box>
  )
}

export { ViewMessageReplyForward }
