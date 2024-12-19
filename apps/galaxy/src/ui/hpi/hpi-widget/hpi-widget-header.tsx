import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ClearButton } from './clear-button'
import { SaveButton } from './save-button'

const HpiWidgetHeader = () => {
  return (
    <TabContentHeading
      title="HPI/Presenting Symptoms"
      className="sticky top-0 z-[11]"
    >
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <ClearButton />
        <SaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { HpiWidgetHeader }
