'use client'

import React from 'react'
import { Button, Flex } from '@radix-ui/themes'

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
          variant="outline"
          className="bg-white h-[48px] rounded-[40px] border border-[#151b4a] px-14 text-[22px] font-[500] leading-[29px]  text-[#151b4a]"
          disabled={activeTab === 'patient-info'}
          onClick={onBack}
        >
          Back
        </Button>
        <Flex gap="1" align="center" className="ms-auto flex-1" justify="end">
          <Button
            variant="outline"
            className="bg-white mr-4 h-[48px] rounded-[40px]  !border !border-[#151b4a]  px-14 text-[22px] font-[500] leading-[29px]  text-[#151b4a]"
          >
            Save & Exit
          </Button>
          <Button
            variant="outline"
            className="h-[48px] rounded-[40px] bg-[#EBEBEF] px-14  text-[22px]  font-[700] leading-[29px] text-[#B9BBC6]"
            disabled
          >
            Skip
          </Button>
          <Button
            variant="outline"
            className="text-white h-[48px] rounded-[40px] bg-[#151b4a]  px-14 text-[22px]  font-[700]  leading-[29px]"
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
