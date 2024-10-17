'use client'

import { Box, Flex, Tabs } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ElectronicPaperSubmissionView } from './electronic-paper-submission-view'
import { useStore } from './store'
import { SubmissionHistoryView } from './submission-history-tab'
import { SubmissionSubmitField } from './submission-submit-field'
import { SubmissionTabs } from './submission-tabs'
import { TabValue } from './types'

const SubmissionTabView = () => {
  const { selectedTab, setSelectedTab, reset } = useStore((state) => ({
    selectedTab: state.selectedTab,
    setSelectedTab: state.setSelectedTab,
    reset: state.reset,
  }))
  const handleTabSelection = (activeTab: TabValue | string) => {
    setSelectedTab(activeTab)
    reset()
  }
  return (
    <Flex direction={'column'} className="gap-0.5">
      <TabContentHeading title="Submission">
        {selectedTab !== TabValue.SubmissionHistory && <SubmissionSubmitField />}
      </TabContentHeading>
      <Tabs.Root
        defaultValue={selectedTab}
        onValueChange={handleTabSelection}
        className="relative z-0"
      >
        <Box className="bg-white mt-1 w-full py-1 shadow-2">
          <SubmissionTabs />
          <Tabs.Content value={TabValue.PaperSubmission}>
            <ElectronicPaperSubmissionView />
          </Tabs.Content>
          <Tabs.Content value={TabValue.ElectronicSubmission}>
            <ElectronicPaperSubmissionView />
          </Tabs.Content>
          <Tabs.Content value={TabValue.SubmissionHistory}>
            <SubmissionHistoryView />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  )
}
export { SubmissionTabView, TabValue }
