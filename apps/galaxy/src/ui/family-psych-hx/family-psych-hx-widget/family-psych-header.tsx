import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'

const PastFamilyHeader = () => {
  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton shouldCheckPermission />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
