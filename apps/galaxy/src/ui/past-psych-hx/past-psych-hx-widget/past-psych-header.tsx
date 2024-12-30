import { Flex } from '@radix-ui/themes'
import { WidgetTabSaveButton, TabContentHeading } from '@/components'

const PastPsychHeader = () => {
  return (
    <TabContentHeading title="Past Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetTabSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastPsychHeader }
