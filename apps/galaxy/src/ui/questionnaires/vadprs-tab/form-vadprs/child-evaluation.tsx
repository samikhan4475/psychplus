import { Flex, Text } from '@radix-ui/themes'
import { RadioSelectSection } from '@/components'
import {
  VADPRS_CHILD_EVALUATION,
  VADPRS_CHILD_EVALUATION_OPTIONS,
} from '../constants'

interface ChildEvaluationProps {
  disabled?: boolean
}

const ChildEvaluation = ({ disabled = false }: ChildEvaluationProps) => {
  return (
    <Flex direction="column" gap="4" mb="3">
      <Text size="1">
        Please consider your child’s behaviors over the past 6 months while
        answering the following questions. Each rating should be considered in{' '}
        <br />
        the context of what is developmentally appropriate for your child’s age.
      </Text>
      <RadioSelectSection
        label="Is this evaluation based on a time when the child:"
        field={VADPRS_CHILD_EVALUATION}
        options={VADPRS_CHILD_EVALUATION_OPTIONS}
        required
        disabled={disabled}
      />
    </Flex>
  )
}

export default ChildEvaluation
