'use client'

import { Text } from '@radix-ui/themes'
import { QuestionRadioSelect } from './question-radio-select'
import { SelectProviderSelect } from './select-provider-select'
import { SimilarVisitCheck } from './similar-visit-checkbox'

const QuestionBlock = () => {
  return (
    <>
      <Text size="2" className="text-pp-black-3 font-bold">
        Questions
      </Text>
      <SelectProviderSelect />
      <QuestionRadioSelect />
      <SimilarVisitCheck />
    </>
  )
}

export { QuestionBlock }
