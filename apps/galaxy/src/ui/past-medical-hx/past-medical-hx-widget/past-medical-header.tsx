import { Flex } from '@radix-ui/themes'
import { WidgetTabSaveButton, TabContentHeading } from '@/components'

const PastMedicalHeader = () => {
  return (
    <TabContentHeading title="Past Medical Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetTabSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastMedicalHeader }
