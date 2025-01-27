'use client'

import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'

interface FooterButtonProps {
  activeTab: string
  onNext: () => void
  onBack: () => void
}
const PreCheckinAssessmentFooterButton = ({
  activeTab,
  onNext,
  onBack,
}: FooterButtonProps) => {
  return (
    <Flex
      className="fixed bottom-0 left-0 right-0 h-[100px] w-full gap-2 bg-[#ffff] shadow-[0px_2px_10px_0px_#00000026]"
      justify="center"
      align="center"
    >
      <Flex
        align="center"
        justify="between"
        className="mx-auto w-full max-w-[1100px] xs:px-5"
      >
        <Button
          highContrast
          variant="outline"
          size="2"
          className={cn(
            activeTab === 'patient-info' && 'text-black',
            'mr-4 px-6',
          )}
          disabled={activeTab === 'patient-info'}
          onClick={onBack}
        >
          Back
        </Button>
        <Flex gap="1" align="center" className="ms-auto flex-1" justify="end">
          <Button highContrast variant="outline" size="2" className="mr-4 px-6">
            Save & Exit
          </Button>
          <Button
            variant="outline"
            color="gray"
            size="2"
            className="bg-[#EBEBEF] px-8"
            disabled
          >
            Skip
          </Button>
          <Button
            highContrast
            size="2"
            className="px-8"
            disabled={activeTab === 'questionnaire'}
            onClick={onNext}
          >
            Save & Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PreCheckinAssessmentFooterButton
