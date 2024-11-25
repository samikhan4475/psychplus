import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { HistoryButton } from './history-button'
import { SocialSaveButton } from './social-save-button'

const SocialHxHeader = () => {
  return (
    <TabContentHeading title="Social Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <SocialSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { SocialHxHeader }
