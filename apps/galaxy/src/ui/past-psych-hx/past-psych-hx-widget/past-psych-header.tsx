import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'

const PastPsychHeader = () => {
  return (
    <TabContentHeading title="Past Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton variant="filled" shouldCheckPermission />
      </Flex>
    </TabContentHeading>
  )
}

export { PastPsychHeader }
