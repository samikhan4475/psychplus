import { Badge } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'
import { getRecipientLabel } from '../../utils'

const ViewMessageProfileDetailsBadge = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const [text, Icon] = getRecipientLabel(message?.channels)
  return (
    <Badge color="gray" variant="outline" className="text-[11px] uppercase">
      {Icon && <Icon width={14} height={14}/>}
      {text}
    </Badge>
  )
}

export { ViewMessageProfileDetailsBadge }
