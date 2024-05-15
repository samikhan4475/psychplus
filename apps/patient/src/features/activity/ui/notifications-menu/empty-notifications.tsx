import { Flex, Text } from '@radix-ui/themes'
import { MailIcon } from 'lucide-react'

const EmptyNotifications = () => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    gap="2"
    p="4"
    className="w-[150px]"
  >
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[50px] w-[50px] border border-dashed border-gray-9"
    >
      <MailIcon
        width={22}
        height={22}
        strokeWidth={1.25}
        className="text-accent-12"
      />
    </Flex>
    <Text weight="light" align="center" className="text-[12px] text-gray-11">
      Nothing to see here. Check back later for new notifications.
    </Text>
  </Flex>
)

export { EmptyNotifications }
