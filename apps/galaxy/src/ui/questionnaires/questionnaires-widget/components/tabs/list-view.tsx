import React from 'react'
import { Flex } from '@radix-ui/themes'
import { DeleteButton } from '../../delete-button'
import { ViewButton } from '../../view-button'
import { QuestionnaireRow } from '../questionnaires-select-section'
import {
  ButtonSection,
  QuestionnaireRowDetail,
} from '../selectable-questionnaire-chip-details'

const ListView = ({
  options,
  label,
}: {
  options: QuestionnaireRow[]
  label: string
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
            key={`${index}+${option.date}`}
          >
            <QuestionnaireRowDetail option={option} label={label} />
            <ButtonSection option={option} showHistory={false} />
          </Flex>
        ))}
    </Flex>
  )
}

export { ListView }
