import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'

const SubstanceUseHxHxHeader = () => {
  return (
    <TabContentHeading title="Substance Use Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { SubstanceUseHxHxHeader }
