import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuestionnairesForm } from '../shared'
import { CLASSNAME_HEADER_CELL } from '../shared/constants'
import {
  GQ_ASC_LABELS,
  GQ_ASC_TABLES,
  SCORE_INTERPRETATION_RANGES,
} from './constants'

interface QuestionnairesFormGqAscProps {
  totalScore: number
  disabled?: boolean
}

const QuestionnairesFormGqAsc = ({
  totalScore,
  disabled,
}: QuestionnairesFormGqAscProps) => {
  return (
    <Flex maxWidth="100%" className="bg-white" px="3" py="1">
      <Flex direction="column" className="w-full">
        {GQ_ASC_TABLES.map((table, index) => {
          const { label, data } = table
          return (
            <QuestionnairesForm
              key={label}
              data={data}
              labels={GQ_ASC_LABELS}
              totalScore={totalScore}
              scoreInterpretationRanges={
                index === GQ_ASC_TABLES.length - 1
                  ? SCORE_INTERPRETATION_RANGES
                  : []
              }
              showCounter={false}
              showHeader={index === 0}
              headingLabel={label}
              disabled={disabled}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export { QuestionnairesFormGqAsc }
