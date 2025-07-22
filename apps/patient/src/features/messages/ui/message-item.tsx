import { Flex } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Messages } from '../types'
import { RecevierMessageView } from './receiver-message-view'
import { SenderMessageView } from './sender-message-view'

const MessageItem = ({ content, isMine, name }: Messages) => {
  return (
    <Flex
      className={cn({
        'justify-end': isMine,
      })}
    >
      {!isMine ? (
        <RecevierMessageView name={name} content={content} />
      ) : (
        <SenderMessageView content={content} />
      )}
    </Flex>
  )
}

export { MessageItem }
