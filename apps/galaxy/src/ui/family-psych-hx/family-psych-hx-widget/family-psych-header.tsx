import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { FamilyPsychSaveButton } from './family-psych-save-button'

const PastFamilyHeader = () => {
  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <FamilyPsychSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
