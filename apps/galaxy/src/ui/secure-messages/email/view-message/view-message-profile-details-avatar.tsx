import { Avatar, Box } from '@radix-ui/themes'
import { getNameInitials } from '@/utils'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessageProfileDetailsAvatar = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const { firstName, lastName } = message?.senderName || {}
  const initials = getNameInitials(`${firstName} ${lastName}`)

  return (
    <Box className="bg-gray-200 rounded-full mr-4 flex h-10 w-10 items-center justify-center">
      <Avatar size="4" fallback={initials} radius="full" />
    </Box>
  )
}

export { ViewMessageProfileDetailsAvatar }
