import React from 'react'
import { Box, Button, Tooltip } from '@radix-ui/themes'
import { ForwardIcon, ReplyAllIcon, ReplyIcon } from '@/components/icons'
import { useStore } from '../../store'
import { ActiveComponent } from '../../types'

const ViewMessageActions = ({
  boxRef,
}: {
  boxRef?: React.RefObject<HTMLDivElement>
}) => {
  const { creatingForwardMessage, createForwardMessage, setActiveComponent } =
    useStore((state) => state)

  const scrollToBottom = () => {
    setTimeout(() => {
      boxRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }, 0)
  }

  const onReplyAllClick = () => {
    setActiveComponent(ActiveComponent.REPLY_TO_ALL)
    scrollToBottom()
  }

  const onReply = () => {
    setActiveComponent(ActiveComponent.REPLY)
    scrollToBottom()
  }

  const onForwardClick = async () => {
    const isSuccess = await createForwardMessage()
    if (isSuccess) setActiveComponent(ActiveComponent.FORWARD)
    scrollToBottom()
  }
  return (
    <Box className="flex space-x-2 items-center border-r border-gray-10 h-4">
      <Tooltip content="Reply All" side="top">
        <Button
          color="gray"
          type="button"
          onClick={onReplyAllClick}
          className="w-[38px] rounded-3 p-0 text-[14px]"
          variant="ghost"
          disabled={creatingForwardMessage}
        >
          <ReplyAllIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Reply" side="top">
        <Button
          color="gray"
          onClick={onReply}
          className="text-black w-[80px] rounded-3 p-0 text-[14px]"
          variant="ghost"
          disabled={creatingForwardMessage}
        >
          <ReplyIcon />
          Reply
        </Button>
      </Tooltip>

      <Tooltip content="Forward" side="top">
        <Button
          onClick={onForwardClick}
          color="gray"
          className="text-black w-[97px] gap-1 rounded-3 p-0 text-[14px]"
          variant="ghost"
          disabled={creatingForwardMessage}
          loading={creatingForwardMessage}
        >
          <ForwardIcon />
          Forward
        </Button>
      </Tooltip>
    </Box>
  )
}

export { ViewMessageActions }
