'use client'

import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import {
  PreCheckinAssessmentTabs,
  SaveAction,
  TabDirection,
} from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'

const PreCheckinAssessmentFooter = () => {
  const {
    activeTab,
    setSaveButtonPressed,
    setSaveAction,
    handleTabNavigation,
    skip,
  } = useStore()

  return (
    <Flex
      className="fixed bottom-0 left-0 right-0 h-[75px] w-full gap-2 bg-[#ffff] shadow-[0px_2px_10px_0px_#00000026]"
      justify="center"
      align="center"
    >
      <Flex align="center" justify="between" className="w-full max-w-[1200px]">
        <Button
          highContrast
          variant="outline"
          size="2"
          className={cn(
            activeTab === PreCheckinAssessmentTabs.PatientInfo && 'text-black',
            'mr-4 px-6',
          )}
          disabled={activeTab === PreCheckinAssessmentTabs.PatientInfo}
          onClick={() => handleTabNavigation(TabDirection.Back, true)}
        >
          Back
        </Button>
        <Flex gap="1" align="center" className="ms-auto flex-1" justify="end">
          <Button
            highContrast
            variant="outline"
            size="2"
            className="mr-4 px-6"
            onClick={() => {
              setSaveButtonPressed(true)
              setSaveAction(SaveAction.Exit)
            }}
          >
            Save & Exit
          </Button>
          <Button
            variant="outline"
            color="gray"
            size="2"
            className="bg-[#EBEBEF] px-8"
            onClick={skip}
          >
            Skip
          </Button>
          <Button
            highContrast
            size="2"
            className="px-8"
            onClick={() => {
              setSaveButtonPressed(true)
              setSaveAction(SaveAction.Next)
            }}
          >
            {activeTab === PreCheckinAssessmentTabs.Questionnaire
              ? 'Save'
              : 'Save & Next'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { PreCheckinAssessmentFooter }
