'use client'

import { memo, useState } from 'react'
import { Box, Tabs } from '@radix-ui/themes'
import { AuthDataTable } from './auth-data-table'
import { EligibilityDataTable } from './eligibility-data-table'

const TabButtons =
  'data-[state=inactive]:text-gray-10 data-[state=inactive]:font-normal data-[state=inactive]:text-1 data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:text-1'

const AuthAndEligibilityTab = memo(() => {
  const [activeTab, setActiveTab] = useState<string>('authInfo')
  return (
    <Tabs.Root
      defaultValue="authInfo"
      className="col-span-full"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Tabs.List size="1" color="iris" highContrast className="inline-flex">
        <Tabs.Trigger value="authInfo" className={TabButtons}>
          Auth Info
        </Tabs.Trigger>
        <Tabs.Trigger value="eligibilityHx" className={TabButtons}>
          Eligibility Hx
        </Tabs.Trigger>
      </Tabs.List>
      <Box pt="3">
        <Tabs.Content value="authInfo">
          {activeTab === 'authInfo' && <AuthDataTable />}
        </Tabs.Content>
        <Tabs.Content value="eligibilityHx">
          {activeTab === 'eligibilityHx' && <EligibilityDataTable />}
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
})

export { AuthAndEligibilityTab }
