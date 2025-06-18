'use client'

import { Flex, Tabs } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ElectronicPaperSubmissionView } from './electronic-paper-submission-view'
import { useStore } from './store'
import { SubmissionHistoryView } from './submission-history-tab'
import { SubmissionSubmitField } from './submission-submit-field'
import { SubmissionTabs } from './submission-tabs'
import { TabValue } from './types'

const SubmissionTabView = () => {
  const { selectedTab, setSelectedTab, reset, setSelectedRows } = useStore(
    (state) => ({
      selectedTab: state.selectedTab,
      setSelectedTab: state.setSelectedTab,
      reset: state.reset,
      setSelectedRows: state.setSelectedRows,
    }),
  )
  const handleTabSelection = (activeTab: TabValue | string) => {
    setSelectedTab(activeTab)
    setSelectedRows([])
    reset()
  }
  return (
    <Flex direction="column" className="flex-1 gap-0.5">
      <TabContentHeading title="Submission">
        {selectedTab !== TabValue.SubmissionHistory && (
          <SubmissionSubmitField />
        )}
      </TabContentHeading>
      <Tabs.Root
        defaultValue={selectedTab}
        onValueChange={handleTabSelection}
        className="relative z-0 !flex flex-1 flex-col"
      >
        <Flex
          direction="column"
          className="bg-white mt-1 w-full flex-1 py-1"
        >
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
        </Flex>
      </Tabs.Root>
    </Flex>
  )
}
export { SubmissionTabView, TabValue }
