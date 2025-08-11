'use client'

import { Flex } from '@radix-ui/themes'
import { BlockProps } from '../../types'
import { IntervieweeRoleRadio } from './interviewee-role-radio'
import { ReferringOrganizationRadio } from './referring-organization-radio'

const EvaluationBlock = ({ disabled = false }: BlockProps) => {
  return (
    <Flex direction="column" gap="2">
      <ReferringOrganizationRadio disabled={disabled} />
      <IntervieweeRoleRadio disabled={disabled} heading='Interviewee Role' />
    </Flex>
  )
}
export { EvaluationBlock }
