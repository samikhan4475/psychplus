'use client'

import { BlockProps } from '../../types'
import { IntervieweeRoleRadio } from './interviewee-role-radio'
import { ReferringOrganizationRadio } from './referring-organization-radio'

const EvaluationBlock = ({ disabled = false }: BlockProps) => {
  return (
    <>
      <ReferringOrganizationRadio disabled={disabled} />
      <IntervieweeRoleRadio disabled={disabled} />
    </>
  )
}
export { EvaluationBlock }
