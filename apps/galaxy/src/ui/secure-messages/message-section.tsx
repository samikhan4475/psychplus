import { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ComposeNewEmail, EmailPlaceHolder } from './email'
import { ReviewEmail } from './email/view-message'
import { MessageHeader } from './message-header'
import { SecureMessagesTable } from './secure-message-table'
import { useStore } from './store'
import { ActiveComponent } from './types'

const MessageSection = ({ tab }: { tab: string }) => {
  const { activeComponent } = useStore((state) => ({
    activeComponent: state.activeComponent,
  }))

  const renderEmailBody = useMemo(() => {
    if (activeComponent === ActiveComponent.NEW_EMAIL_PLACEHOLDER)
      return <EmailPlaceHolder />
    else if (activeComponent === ActiveComponent.PREVIEW_EMAIL)
      return <ReviewEmail />
    else return <ComposeNewEmail />
  }, [activeComponent])

  return (
    <Flex className="border-pp-gray-2 bg-white w-full border-t">
      <Flex
        className="border-pp-gray-2 h-[100vh] w-[42%]  border-r pt-1"
        direction="column"
      >
        <MessageHeader tab={tab} />
        <SecureMessagesTable />
      </Flex>
      <Box className="w-[60%] ">{renderEmailBody}</Box>
    </Flex>
  )
}

export { MessageSection }
