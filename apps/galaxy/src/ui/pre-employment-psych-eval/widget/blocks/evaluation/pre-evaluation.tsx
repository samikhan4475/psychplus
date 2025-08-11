'use client'

import { Flex } from '@radix-ui/themes'
import {
  IntervieweeRoleRadio,
  ReferringOrganizationRadio,
} from '@/ui/fit-for-duty-psych-eval/widget/blocks'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PreEvaluationBlock = ({ disabled = false }: BlockProps) => {
  return (
    <Flex direction="column" gap="2">
      <ReferringOrganizationRadio disabled={disabled} />
      <IntervieweeRoleRadio
        heading="Role seeking to fill"
        disabled={disabled}
      />
    </Flex>
  )
}
export { PreEvaluationBlock }
