import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { HistoryButton } from './history-button'
import { PastMedicalSaveButton } from './past-medical-save-button'

const PastMedicalHeader = () => {
  return (
    <TabContentHeading title="Past Medical Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <PastMedicalSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastMedicalHeader }
