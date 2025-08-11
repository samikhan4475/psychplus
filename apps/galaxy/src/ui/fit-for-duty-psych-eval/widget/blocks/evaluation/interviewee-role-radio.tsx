'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectSection } from '@/components'
import { INTERVIEWEE_ROLE_OPTIONS } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { SchemaType } from '../../schema'
import { IntervieweeRoleInput } from './interviewee-role-input'

const IntervieweeRoleRadio = ({ heading, disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const intervieweeRole = watch('intervieweeRole')
  return (
    <Flex align="center" gap="2">
      <RadioSelectSection
        label={heading}
        field="intervieweeRole"
        options={INTERVIEWEE_ROLE_OPTIONS}
        disabled={disabled}
        required
        lastOptionIndicator
        errorField="intervieweeRole"
        shouldTriggerOnChange
        onChange={(val) => {
          if (val === 'other') {
            setValue('intervieweeRoleOtherDetails', '')
          }
        }}
      />

      {intervieweeRole === 'other' && (
        <IntervieweeRoleInput disabled={disabled} />
      )}
      <FormFieldError name="referringOrganization" />
    </Flex>
  )
}
export { IntervieweeRoleRadio }
