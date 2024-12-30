import { Flex } from '@radix-ui/themes'
import { WidgetTabSaveButton, TabContentHeading } from '@/components'

const SocialHxHeader = () => {
  return (
    <TabContentHeading title="Social Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetTabSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { SocialHxHeader }
