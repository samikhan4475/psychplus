import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'

const SocialHxHeader = () => {
  return (
    <TabContentHeading title="Social Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { SocialHxHeader }
