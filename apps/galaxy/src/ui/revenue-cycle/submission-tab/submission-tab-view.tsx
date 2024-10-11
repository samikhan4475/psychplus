'use client'
import { Box, Flex, Tabs } from '@radix-ui/themes'
import { SubmissionSubmitField } from './submission-submit-field'
import { SubmissionTabs } from './submission-tabs'
import { useStore } from './store'
import { TabValue } from './types'
import { ElectronicPaperSubmissionView } from './electronic-paper-submission-view'
import { TabContentHeading } from '@/components'
const SubmissionTabView = () => {
  const { selectedTab, setSelectedTab, reset } = useStore(state => ({ selectedTab: state.selectedTab, setSelectedTab: state.setSelectedTab, reset: state.reset }))
  const handleTabSelection = (activeTab: TabValue | string) => {
    setSelectedTab(activeTab)
    reset()
  }
  return (
    <Flex direction={'column'} className="gap-0.5">
      <TabContentHeading title="Submission">
        <SubmissionSubmitField />
      </TabContentHeading>
      <Tabs.Root
        defaultValue={selectedTab}
        onValueChange={handleTabSelection}
        className="relative z-0"
      >
        <Box className="w-full py-1 mt-1 bg-white shadow-2">
          <SubmissionTabs />
          <Tabs.Content value={TabValue.PaperSubmission}>
            <ElectronicPaperSubmissionView />
          </Tabs.Content>
          <Tabs.Content value={TabValue.ElectronicSubmission}>
            <ElectronicPaperSubmissionView />
          </Tabs.Content>
          <Tabs.Content value={TabValue.SubmissionHistory}>
            {/* TODO: Submission View here */}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  )
}
export { SubmissionTabView, TabValue }
