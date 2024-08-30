import { Box, Checkbox, Flex, Tabs, Text } from '@radix-ui/themes'
import { AddClaimForm } from './claim-form/add-claim-form'
import { ClaimTable } from './claim-table/claim-table'
import './style.css'
import { Cross1Icon } from '@radix-ui/react-icons'
import { initialTabs, useStore } from '../store'
import { SubmissionView } from './submission-view'

const ClaimView = () => {
  const { tabs, activeTabId, setActiveTab, selectedClaimId, removeTab } =
    useStore((state) => ({
      addTab: state.addTab,
      tabs: state.tabs,
      activeTabId: state.activeTabId,
      setActiveTab: state.setActiveTab,
      selectedClaimId: state.selectedClaimId,
      removeTab: state.removeTab,
    }))
  // Combine initial tabs with dynamically added tabs
  const allTabs = initialTabs.concat(
    tabs.filter(
      (tab) => !initialTabs.some((initialTab) => initialTab.id === tab.id),
    ),
  )
  return (
    <Box mb="7">
      <Tabs.Root
        defaultValue="Claims"
        value={activeTabId}
        onValueChange={setActiveTab}
      >
        <Tabs.List className="bg-[#f0f4ff]">
          {allTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
              value={tab.id}
            >
              {tab.label}
              {tab.claimId && (
                <Cross1Icon
                  height={10}
                  width={15}
                  onClick={() => removeTab(tab.id)}
                />
              )}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box px="4" pt="3" pb="2">
          <Box
            className={activeTabId === 'claimstable' ? 'block' : 'hidden'}
            // id="claimstable"
            key={'claimstable'}
          >
            <ClaimTable />
          </Box>
          <Tabs.Content value="Submission">
            <SubmissionView />
          </Tabs.Content>
          <Tabs.Content value="Ins. Payment">
            <Text size="2">Ins. Payment Content will come here</Text>
            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox /> Ready to Send
              </Flex>
            </Text>
          </Tabs.Content>
          <Box
            className={activeTabId === 'patient-payment' ? 'block' : 'hidden'}
            // id="ins-payment"
            key={'ins-payment'}
          >
            Patient Payment Content will come here
            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox /> Hold Statement
              </Flex>
            </Text>
          </Box>
          <Box
            className={activeTabId === 'patient-statement' ? 'block' : 'hidden'}
            // id="ins-payment"
            key={'ins-payment'}
          >
            Patient Statement Content will come here
          </Box>
          {tabs.map((tab) => (
            <Box
              className={tab.id === activeTabId ? 'block' : 'hidden'}
              id={tab.id}
              key={tab.id}
            >
              <AddClaimForm
                selectedClaimId={selectedClaimId}
                claimNumber={tab.claimNumber}
              />
            </Box>
          ))}
          {/* <Tabs.Content value="Claim#222">
            <AddClaimForm />
          </Tabs.Content> */}
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export { ClaimView }
