import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { HistoryButton } from './history-button'
import { SaveButton } from './save-button'
import { ClearButton } from './clear-button'

const HpiWidgetHeader = () => {
  return (
    <TabContentHeading title="HPI/Presenting Symptoms">
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <HistoryButton />
        <ClearButton/>
        <SaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { HpiWidgetHeader }
