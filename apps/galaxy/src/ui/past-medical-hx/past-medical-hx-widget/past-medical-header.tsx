import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { HistoryButton } from './history-button'
import { PastMedicalSaveButton } from './past-medical-save-button'

interface PastMedicalHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}
const PastMedicalHeader = ({ patientId, getData }: PastMedicalHeaderProps) => {
  return (
    <TabContentHeading title="Past Medical Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <PastMedicalSaveButton patientId={patientId} getData={getData} />
      </Flex>
    </TabContentHeading>
  )
}

export { PastMedicalHeader }
