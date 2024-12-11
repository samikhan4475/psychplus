import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { PastMedicalSaveButton } from './past-medical-save-button'

const PastMedicalHeader = () => {
  return (
    <TabContentHeading title="Past Medical Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <PastMedicalSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastMedicalHeader }
