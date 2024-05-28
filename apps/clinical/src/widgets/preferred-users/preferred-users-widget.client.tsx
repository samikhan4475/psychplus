'use client'

import { useState } from 'react'
import { Box, Button, Flex, Heading, Tabs } from '@radix-ui/themes'
import { SaveIcon } from '@/components/icons'
import { LinkUserIcon } from '@/components/icons/link-user-icon'
import { LinkUserModal } from '../link-user-dialog/components'
import { ActiveUsersTable } from './components/active-users-table'
import { FilterForm } from './components/filters'
import { NoRecordFound } from './components/no-record-found'
import { PreferredUsersDialog } from './components/preferred-users-dialog'
import { WorklistUsersTable } from './components/worklist-users-table'
import { useStore } from './store'

const PreferredUsersWidgetClient = () => {
  const worklistPatients = useStore((state) => state.preferredPartnerWorklist)
  const activePatients = useStore((state) => state.preferredPartnerPatient)

  const [activeTab, setActiveTab] = useState(0)
  return (
    <Tabs.Root defaultValue="active-users" className="shadow-none">
      <Tabs.List>
        <Tabs.Trigger
          value="active-users"
          onClick={() => setActiveTab(0)}
          className={`${
            !activeTab
              ? 'bg-[#ffffff] font-bold text-[#151B4A]'
              : 'bg-[#F0F4FF] text-[#000000]'
          } text-12 cursor-pointer border border-b-0 border-r-0 border-solid border-[#8eafeb] before:hidden`}
        >
          Active Users
        </Tabs.Trigger>
        <Tabs.Trigger
          value="worklist"
          onClick={() => setActiveTab(1)}
          className={`${
            activeTab
              ? 'bg-[#ffffff] font-bold text-[#151B4A]'
              : 'bg-[#F0F4FF] text-[#000000]'
          } text-12 cursor-pointer border border-b-0 border-solid border-[#8eafeb] before:hidden`}
        >
          Worklist
        </Tabs.Trigger>
      </Tabs.List>

      <Box pb="2">
        <Tabs.Content value="active-users">
          <Box className="relative bg-[#fff] px-2 py-1.5 shadow-[0_0_4px_2px_rgba(0,0,0,0.08)]">
            <Flex justify="between" align="center">
              <Heading as="h3" size="3">
                Active Users
              </Heading>
              <Flex gap="2">
                <Button
                  variant="outline"
                  className="cursor-pointer border border-solid border-[#9E9898] shadow-[0_0_0_rgba(0,0,0,0)]"
                >
                  <LinkUserIcon />
                  <LinkUserModal />
                </Button>

                <Button color="indigo" highContrast className="cursor-pointer">
                  <SaveIcon />
                  Edit profile
                </Button>
              </Flex>
            </Flex>
          </Box>

          <FilterForm filterOf={'active'} />
          {activePatients.length ? (
            <ActiveUsersTable data={activePatients} />
          ) : (
            <NoRecordFound />
          )}
        </Tabs.Content>

        <Tabs.Content value="worklist">
          <Box className="relative bg-[#fff] px-2 py-1.5 shadow-[0_0_4px_2px_rgba(0,0,0,0.08)]">
            <Flex justify="between" align="center">
              <Heading as="h3" size="3">
                Worklist
              </Heading>
              <Flex gap="2">
                <Button
                  variant="outline"
                  className="shadow-none cursor-pointer border border-solid border-[#9E9898]"
                >
                  <PreferredUsersDialog />
                </Button>

                <Button color="indigo" highContrast className="cursor-pointer">
                  <SaveIcon />
                  Save
                </Button>
              </Flex>
            </Flex>
          </Box>
          <FilterForm filterOf={'worklist'} />
          {worklistPatients.length ? (
            <WorklistUsersTable data={worklistPatients} />
          ) : (
            <NoRecordFound />
          )}
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}

export { PreferredUsersWidgetClient }
