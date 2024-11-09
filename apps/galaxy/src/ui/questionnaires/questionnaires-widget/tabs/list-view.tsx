import React from 'react'
import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { QuestionnaireRowDetail, RowRightButtons } from '../blocks'

const ListView = ({
  options,
  label,
}: {
  options: QuickNoteHistory[]
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
            key={`${index}+${option.createdOn}`}
          >
            <QuestionnaireRowDetail option={option} label={label} />
            {/* <RowRightButtons options={options} /> */}
          </Flex>
        ))}
    </Flex>
  )
}

export { ListView }
