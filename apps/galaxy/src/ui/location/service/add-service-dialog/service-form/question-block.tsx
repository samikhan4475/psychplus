'use client'

import { Text } from '@radix-ui/themes'
import { PrimaryProviderTypeSelect } from './primary-provider-type-select'
import { QuestionRadioSelect } from './question-radio-select'
import { SimilarVisitCheck } from './similar-visit-checkbox'

const QuestionBlock = () => {
  return (
    <>
      <Text size="2" className="text-pp-black-3 font-bold">
        Questions
      </Text>
      <PrimaryProviderTypeSelect />
      <QuestionRadioSelect />
      <SimilarVisitCheck />
    </>
  )
}

export { QuestionBlock }
