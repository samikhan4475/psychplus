import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'

const PastMedicalHeader = () => {
  return (
    <TabContentHeading title="Past Medical Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { PastMedicalHeader }
