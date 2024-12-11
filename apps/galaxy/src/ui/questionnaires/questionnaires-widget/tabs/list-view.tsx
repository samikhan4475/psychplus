import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { QuestionnaireRowDetail } from '../blocks'

const ListView = ({
  options,
  label,
  questionnaire,
}: {
  options: QuickNoteHistory[]
  label: string
  questionnaire: string
}) => {
  return (
    <Flex direction="column">
      {options?.length > 1 &&
        options.map((option, index) => (
          <Flex
            align="center"
            className="border-pp-table-subRows border border-t-0"
            px="2"
            py="2"
            justify="between"
            key={`${index}+${option.createdOn}`}
          >
            <QuestionnaireRowDetail
              option={option}
              label={label}
              historiesData={options.length}
              questionnaire={questionnaire}
            />
          </Flex>
        ))}
    </Flex>
  )
}

export { ListView }
