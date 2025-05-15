import React, { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldError,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import { PsychiatryAssessmentPlanTabSchemaType } from '../psychiatry-assessment-plan-tab-schema'

interface SafetyPlanningBlockProps {
  title: string
  fieldId: keyof PsychiatryAssessmentPlanTabSchemaType
  options: GroupSelectOption<string>[]
}

const SafetyPlanningBlock = ({
  title,
  fieldId,
  options,
}: SafetyPlanningBlockProps) => {
  const form = useFormContext<PsychiatryAssessmentPlanTabSchemaType>()
  const {
    watch,
    clearErrors,
    formState: { errors },
  } = form

  const hasError = !!errors[fieldId]
  const safetyPlanningIntervention = watch('safetyPlanningIntervention')

  useEffect(() => {
    if (!safetyPlanningIntervention) {
      clearErrors(fieldId)
    }
  }, [safetyPlanningIntervention, fieldId, clearErrors])

  return (
    <Flex>
      <GroupSelectSection
        label={title}
        field={fieldId}
        options={options}
        blockLabelProps={{ required: safetyPlanningIntervention }}
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      <FormFieldError className="ml-2" name={fieldId} />
    </Flex>
  )
}

export { SafetyPlanningBlock }
