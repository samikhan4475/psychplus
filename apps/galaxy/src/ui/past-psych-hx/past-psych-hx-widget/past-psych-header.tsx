import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { PastPsychSaveButton } from './past-psych-save-button'

const PastPsychHeader = () => {
  return (
    <TabContentHeading title="Past Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <PastPsychSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { PastPsychHeader }
