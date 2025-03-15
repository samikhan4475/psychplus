'use client'

import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Button, Flex } from '@radix-ui/themes'
import {
  SaveAction,
  TabDirection,
} from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'

const PreCheckinAssessmentFooter = () => {
  const {
    tabsToShow,
    activeTab,
    setIsSaveButtonPressed,
    setSaveAction,
    handleTabNavigation,
    isSaveButtonDisabled,
    setIsSaveButtonDisabled,
  } = useStore()
  const isLastTab = activeTab === tabsToShow.at(-1)

  return (
    <Flex
      className="fixed bottom-0 left-0 right-0 h-[75px] w-full gap-2 bg-[#ffff] shadow-[0px_2px_10px_0px_#00000026]"
      justify="center"
      align="center"
    >
      <Flex align="center" justify="between" className="w-full max-w-[1200px]">
        <Button
          color="gray"
          variant="outline"
          size="2"
          className={cn(!isSaveButtonDisabled && 'text-black', 'px-6')}
          disabled={isSaveButtonDisabled}
          onClick={() => handleTabNavigation(TabDirection.Back)}
        >
          Back
        </Button>
        <Flex gap="2" align="center" className="ms-auto flex-1" justify="end">
          {!isLastTab && (
            <Button
              color="gray"
              variant="outline"
              size="2"
              className={cn(
                !isSaveButtonDisabled && 'text-black',
                'w-24 items-center',
              )}
              onClick={() => handleTabNavigation(TabDirection.Next)}
              disabled={isSaveButtonDisabled}
            >
              Next
            </Button>
          )}
          {!isLastTab && (
            <Button
              color="gray"
              variant="outline"
              size="2"
              className={cn(
                !isSaveButtonDisabled && 'text-black',
                'w-24 items-center',
              )}
              onClick={() => {
                setIsSaveButtonDisabled(true)
                setIsSaveButtonPressed(true)
              }}
              disabled={isSaveButtonDisabled}
            >
              Save
            </Button>
          )}
          <Button
            highContrast
            size="2"
            className="px-4"
            onClick={() => {
              setIsSaveButtonDisabled(true)
              setIsSaveButtonPressed(true)
              setSaveAction(SaveAction.Next)
            }}
            disabled={isSaveButtonDisabled}
          >
            {activeTab === tabsToShow.at(-1)
              ? 'Save & Complete'
              : 'Save & Next'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { PreCheckinAssessmentFooter }
