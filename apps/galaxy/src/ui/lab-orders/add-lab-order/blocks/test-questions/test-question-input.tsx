import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError } from '@/components'
import { LabTestAnswers, Question } from '../types'
import { InputArea } from './input-area'

const TestQuestionInput = ({
  question,
  id,
  testAnswer,
}: {
  question: Question
  id: string
  testAnswer?: LabTestAnswers | null
}) => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required={question?.isMandatory ?? false}>
        {question?.questionText ?? ''}
      </BlockLabel>
      <InputArea
        question={question}
        id={id}
        defaultValue={testAnswer?.entryAnswer ?? ''}
      />
      <FormFieldError
        name={`labQuestions[${id}_${question.questionCode}].answer`}
      />
    </Flex>
  )
}

export { TestQuestionInput }
