import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { FamilyPsychSaveButton } from './family-psych-save-button'
import { HistoryButton } from './history-button'

const PastFamilyHeader = () => {
  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <FamilyPsychSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
