import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuestionnairesForm } from '../shared'
import { LABELS, QUESTIONS } from './constants'
import { QuestionnairesFormMdqDataTable } from './mdq-data-table'

interface QuestionnairesFormGqAscProps {
  totalScore: number
  Q14?: string
  Q15?: string
  disabled?: boolean
}

const QuestionnairesFormMdq = ({
  totalScore,
  Q14,
  Q15,
  disabled,
}: QuestionnairesFormGqAscProps) => {
  return (
    <Flex maxWidth="100%" className="bg-white" px="3" py="1">
      <Flex direction="column" className="w-full">
        <QuestionnairesForm
          data={QUESTIONS}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={[]}
          disabled={disabled}
          showHeader
        />

        <QuestionnairesFormMdqDataTable
          isWidthFifty={true}
          label="Follow-up Questions"
          Q14={Q14}
          Q15={Q15}
          totalScore={totalScore}
        />
      </Flex>
    </Flex>
  )
}

export { QuestionnairesFormMdq }
