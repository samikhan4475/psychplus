import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { FamilyPsychSaveButton } from './family-psych-save-button'
import { HistoryButton } from './history-button'

interface PastFamilyHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const PastFamilyHeader = ({ patientId, getData }: PastFamilyHeaderProps) => {
  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <FamilyPsychSaveButton patientId={patientId} getData={getData} />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
