'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Check, Circle } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { PreCheckinAssessmentTab } from '@/features/pre-checkin-assessment/types'

type PreCheckinAssessmentHeaderProps = {
  tabs: PreCheckinAssessmentTab[]
}

const PreCheckinAssessmentHeader = ({
  tabs,
}: PreCheckinAssessmentHeaderProps) => {
  const { activeTab, completedTabs, setActiveTab } = useStore()

  const handleTabChange = (value: PreCheckinAssessmentTabs) => {
    setActiveTab(value)
  }

  return (
    <Tabs.List className="flex w-full gap-3">
      {tabs.map((tab) => {
        const { trigger, indicator, label } = getTabStyles(
          tab.id,
          activeTab,
          completedTabs,
        )
        return (
          <Flex
            key={tab.id}
            direction="column"
            className="flex-1 cursor-pointer gap-2"
            align="center"
            onClick={() => handleTabChange(tab.id)}
          >
            <Tabs.Trigger value={tab.id} id={tab.id} className={trigger} />
            <Flex width="100%" gap="1">
              <Box className={indicator}>
                {activeTab === tab.id ? (
                  <Circle size="8px" strokeWidth="4px" fill="white" />
                ) : (
                  activeTab !== tab.id &&
                  completedTabs?.includes(tab.id) && (
                    <Check strokeWidth="3.5px" color="white" />
                  )
                )}
              </Box>
              <Text className={label}>{tab.id}</Text>
            </Flex>
          </Flex>
        )
      })}
    </Tabs.List>
  )
}

const getTabStyles = (
  tabId: PreCheckinAssessmentTabs,
  activeTab: PreCheckinAssessmentTabs,
  completedTabs: PreCheckinAssessmentTabs[],
) => {
  const isActive = activeTab === tabId
  const isCompleted = completedTabs?.includes(tabId)

  let backgroundColor = ''

  if (isActive) {
    backgroundColor = 'bg-[#194595]'
  } else if (isCompleted) {
    backgroundColor = 'bg-pp-gray-1'
  } else {
    backgroundColor = 'bg-[#D1DAEA]'
  }

  return {
    trigger: cn('h-1 w-full cursor-pointer rounded-4', backgroundColor),
    indicator: cn(
      'rounded-full flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center border-2 border-[#D1DAEA]',
      isCompleted ? 'bg-pp-gray-1 border-pp-gray-1' : '',
      isActive ? 'bg-pp-blue-3 border-pp-blue-3' : '',
    ),
    label: cn(
      'text-[12px] font-medium',
      isActive ? 'text-black' : 'text-pp-gray-1',
    ),
  }
}

export { PreCheckinAssessmentHeader }
