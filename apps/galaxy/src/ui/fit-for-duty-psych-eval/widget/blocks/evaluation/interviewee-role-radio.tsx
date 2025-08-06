'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectSection } from '@/components'
import { INTERVIEWEE_ROLE_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'
import { IntervieweeRoleInput } from './interviewee-role-input'

const IntervieweeRoleRadio = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const intervieweeRole = watch('intervieweeRole')
  return (
    <Flex align="center" gap="2">
      <RadioSelectSection
        label="Interviewee Role"
        field="intervieweeRole"
        options={INTERVIEWEE_ROLE_OPTIONS}
        disabled={disabled}
        required
        lastOptionIndicator
        errorField="intervieweeRole"
        shouldTriggerOnChange
      />

      {intervieweeRole === 'other' && (
        <IntervieweeRoleInput disabled={disabled} />
      )}
      <FormFieldError name="referringOrganization" />
    </Flex>
  )
}
export { IntervieweeRoleRadio }
