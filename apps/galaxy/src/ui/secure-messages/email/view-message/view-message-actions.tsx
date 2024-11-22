import React from 'react'
import { Box } from '@radix-ui/themes'
import { ForwardButton, ReplyAllButton, ReplyButton } from '..'
import { useStore } from '../../store'
import { ActiveComponent } from '../../types'

const ViewMessageActions = () => {
  const { creatingForwardMessage, createForwardMessage, setActiveComponent } =
    useStore((state) => state)

  return (
    <Box className="mt-4 flex  space-x-2">
      <ReplyAllButton
        disabled={creatingForwardMessage}
        onClick={() => setActiveComponent(ActiveComponent.REPLY_TO_ALL)}
      />
      <ReplyButton
        disabled={creatingForwardMessage}
        onClick={() => setActiveComponent(ActiveComponent.REPLY)}
      />
      <ForwardButton
        onClick={async () => {
          const isSuccess = await createForwardMessage()
          if (isSuccess) setActiveComponent(ActiveComponent.FORWARD)
        }}
        disabled={creatingForwardMessage}
      />
    </Box>
  )
}

export { ViewMessageActions }
