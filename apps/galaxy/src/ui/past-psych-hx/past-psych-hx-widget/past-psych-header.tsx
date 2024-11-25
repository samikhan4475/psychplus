import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { HistoryButton } from './history-button'
import { PastPsychSaveButton } from './past-psych-save-button'

interface PastPsychHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const PastPsychHeader = ({ patientId, getData }: PastPsychHeaderProps) => {
  return (
    <TabContentHeading title="Past Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <PastPsychSaveButton patientId={patientId} getData={getData} />
      </Flex>
    </TabContentHeading>
  )
}

export { PastPsychHeader }
