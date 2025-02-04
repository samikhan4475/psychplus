import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'
import { ClearButton } from './clear-button'

const HpiWidgetHeader = () => {
  return (
    <TabContentHeading
      title="HPI/Presenting Symptoms"
      className="sticky top-0 z-[11]"
    >
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <ClearButton shouldCheckPermission/>
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { HpiWidgetHeader }
