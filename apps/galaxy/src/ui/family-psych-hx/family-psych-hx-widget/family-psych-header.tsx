import { Flex } from '@radix-ui/themes'
import { WidgetTabSaveButton, TabContentHeading } from '@/components'

const PastFamilyHeader = () => {
  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetTabSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
