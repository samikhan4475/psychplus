'use client'

import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { CheckBoxCircleIcon } from '@/components/icons'
import { IconBlock } from '../shared'
import { Step, StepComponentProps } from '../types'
import { CompleteNextStep } from './complete-next-step'
import { PrescriptionBlock } from './prescription-block'

const PrescriptionComplete = ({
  onClose,
  onJump,
  transmissionResult,
}: StepComponentProps) => {
  const transactionId = transmissionResult?.[0]?.id ?? ''
  const transactionDate = transmissionResult?.[0]?.writtenDate ?? ''
  return (
    <Flex direction="column" justify="between" className="min-h-[491px]">
      <Flex direction="column" gap="3">
        <IconBlock
          title="The medication has been added to the patient&#39;s record and sent to
        the pharmacy."
          icon={<CheckBoxCircleIcon />}
        />

        <PrescriptionBlock
          transactionId={transactionId}
          transactionDate={transactionDate}
        />
        <CompleteNextStep />
      </Flex>
      <Flex justify="end" gap="2">
        <Button
          size="2"
          variant="outline"
          type="button"
          color="gray"
          className="text-black"
          onClick={onClose}
        >
          Return to Records
        </Button>
        <Button
          size="2"
          type="button"
          highContrast
          onClick={() => onJump(Step.Form)}
        >
          Add More
        </Button>
      </Flex>
    </Flex>
  )
}

export { PrescriptionComplete }
